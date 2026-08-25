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

    const cleanLines = text
      .split('\n')
      .map((l: string) => l.trim().replace(/[^\w\s\-\:\.\,]/gi, ''))
      .filter((l: string) => {
        const words = l.split(/\s+/).filter(w => w.length > 2);
        const alphaCount = (l.match(/[a-zA-Z]/g) || []).length;
        return words.length >= 2 && alphaCount >= 8 && (alphaCount / l.length) > 0.6;
      });

    const t1 = cleanLines[0] ? cleanLines[0].substring(0, 35) : "Foundational Core & Theory";
    const t2 = cleanLines[1] ? cleanLines[1].substring(0, 35) : "Architecture & Data Models";
    const t3 = cleanLines[2] ? cleanLines[2].substring(0, 35) : "Algorithms & Execution";
    const t4 = cleanLines[3] ? cleanLines[3].substring(0, 35) : "State Management & Verification";
    const t5 = cleanLines[4] ? cleanLines[4].substring(0, 35) : "Optimization & Scalability";
    const t6 = cleanLines[5] ? cleanLines[5].substring(0, 35) : "Advanced Systems & Security";

    let graphData = {
      nodes: [
        { id: "1", data: { label: t1 }, position: { x: 250, y: 0 } },
        { id: "2", data: { label: t2 }, position: { x: 100, y: 120 } },
        { id: "3", data: { label: t3 }, position: { x: 400, y: 120 } },
        { id: "4", data: { label: t4 }, position: { x: 50, y: 240 } },
        { id: "5", data: { label: t5 }, position: { x: 250, y: 240 } },
        { id: "6", data: { label: t6 }, position: { x: 450, y: 240 } }
      ],
      edges: [
        { id: "e1-2", source: "1", target: "2", animated: true },
        { id: "e1-3", source: "1", target: "3", animated: true },
        { id: "e2-4", source: "2", target: "4", animated: true },
        { id: "e2-5", source: "2", target: "5", animated: true },
        { id: "e3-6", source: "3", target: "6", animated: true }
      ]
    };

    try {
      if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'dummy_key') {
        const prompt = `Analyze the following syllabus text and generate a Knowledge Graph (nodes and edges) representing the curriculum.
Create up to 10 nodes (topics/subtopics) and connect them logically with edges.
Return STRICTLY as a JSON object with this exact structure:
{
  "nodes": [ { "id": "1", "data": { "label": "Topic Name" }, "position": { "x": 0, "y": 0 } } ],
  "edges": [ { "id": "e1-2", "source": "1", "target": "2", "animated": true } ]
}
Make the (x,y) positions logical (e.g. root node at 250, 0, children branching out below it).
Syllabus Text: ${text.substring(0, 2000)}
Do not include markdown blocks outside the JSON object.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
        });

        let jsonStr = response.text?.replace(/```json/g, '').replace(/```/g, '').trim() || '';
        if (jsonStr) {
          const parsed = JSON.parse(jsonStr);
          if (parsed.nodes && parsed.nodes.length > 0) {
            graphData = parsed;
          }
        }
      }
    } catch (aiErr) {
      console.warn("Galaxy AI generation rate-limited. Using structured fallback.", aiErr);
    }

    // Save to DB if logged in
    try {
      if (session?.user && (session.user as any).id) {
        await connectToDatabase();
        await User.updateOne(
          { _id: (session.user as any).id },
          { $set: { "currentSyllabusData.galaxy": graphData } }
        );
      }
    } catch (dbErr) {
      console.error("Galaxy DB save error:", dbErr);
    }

    return NextResponse.json(graphData);

  } catch (error) {
    console.error('Fatal Galaxy API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
