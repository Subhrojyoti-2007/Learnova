import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/User';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'dummy_key' });

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json([]);
    }

    const prompt = `Analyze the following syllabus text and generate a Diagnosis Test.
Create exactly 9 questions broken down by Topic and Difficulty.
Identify 3 main topics. For each topic, create 1 Easy, 1 Medium, and 1 Hard question.
Return STRICTLY as a JSON array of objects:
[
  { "topic": "Topic Name", "difficulty": "easy", "text": "...", "options": ["opt1", "opt2", "opt3", "opt4"], "correctOptionIndex": 0, "solution": "..." }
]
Syllabus Text: ${text.substring(0, 3000)}
Do not include markdown blocks outside the JSON array.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    let jsonStr = response.text?.replace(/```json/g, '').replace(/```/g, '').trim() || '[]';
    let diagnosisData = [];
    
    try {
      diagnosisData = JSON.parse(jsonStr);
    } catch (e) {
      console.error("Failed to parse Diagnose JSON:", jsonStr);
    }

    if (session?.user && (session.user as any).id) {
      await connectToDatabase();
      await User.updateOne(
        { _id: (session.user as any).id },
        { $set: { "currentSyllabusData.diagnose": diagnosisData } }
      );
    }

    return NextResponse.json(diagnosisData);

  } catch (error) {
    console.error('Diagnose API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
