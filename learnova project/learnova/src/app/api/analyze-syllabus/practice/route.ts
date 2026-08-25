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

    const prompt = `Analyze the following syllabus text and generate a massive Practice Question bank.
Identify 3 main topics. For each topic, create 5 Easy, 5 Medium, and 5 Hard questions (45 questions total).
Return STRICTLY as a JSON array of objects:
[
  { "concept": "Topic Name", "difficulty": "easy", "estimatedTime": "1 min", "text": "...", "code": "", "options": ["opt1", "opt2", "opt3", "opt4"], "correctAnswer": 0 }
]
Syllabus Text: ${text.substring(0, 3000)}
Do not include markdown blocks outside the JSON array.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    let jsonStr = response.text?.replace(/```json/g, '').replace(/```/g, '').trim() || '[]';
    let practiceData = [];
    
    try {
      practiceData = JSON.parse(jsonStr);
    } catch (e) {
      console.error("Failed to parse Practice JSON:", jsonStr);
    }

    if (session?.user && (session.user as any).id) {
      await connectToDatabase();
      await User.updateOne(
        { _id: (session.user as any).id },
        { $set: { "currentSyllabusData.practice": practiceData } }
      );
    }

    return NextResponse.json(practiceData);

  } catch (error) {
    console.error('Practice API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
