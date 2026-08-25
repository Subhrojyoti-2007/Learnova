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
      return NextResponse.json({ nodes: [], edges: [] });
    }

    const prompt = `Analyze the following syllabus text and generate a Knowledge Graph (nodes and edges) representing the curriculum.
Create up to 10 nodes (topics/subtopics) and connect them logically with edges.
Return STRICTLY as a JSON object with this exact structure:
{
  "nodes": [ { "id": "1", "data": { "label": "Topic Name" }, "position": { "x": 0, "y": 0 } } ],
  "edges": [ { "id": "e1-2", "source": "1", "target": "2", "animated": true } ]
}
Make the (x,y) positions logical (e.g. root node at 250, 0, children branching out below it).
Syllabus Text: ${text.substring(0, 3000)}
Do not include markdown blocks outside the JSON object.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    let jsonStr = response.text?.replace(/```json/g, '').replace(/```/g, '').trim() || '{"nodes":[],"edges":[]}';
    let graphData = { nodes: [], edges: [] };
    
    try {
      graphData = JSON.parse(jsonStr);
    } catch (e) {
      console.error("Failed to parse Galaxy JSON:", jsonStr);
    }

    // Save to DB if logged in
    if (session?.user && (session.user as any).id) {
      await connectToDatabase();
      await User.updateOne(
        { _id: (session.user as any).id },
        { $set: { "currentSyllabusData.galaxy": graphData } }
      );
    }

    return NextResponse.json(graphData);

  } catch (error) {
    console.error('Galaxy API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
