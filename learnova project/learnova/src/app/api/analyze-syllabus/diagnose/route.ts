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

    const top1 = cleanLines[0] ? cleanLines[0].substring(0, 35) : "Foundations & Theory";
    const top2 = cleanLines[1] ? cleanLines[1].substring(0, 35) : "Core Implementation";
    const top3 = cleanLines[2] ? cleanLines[2].substring(0, 35) : "Advanced Systems";

    let diagnosisData = [
      { topic: top1, difficulty: "easy", text: `What is the fundamental purpose of ${top1}?`, options: ["Systematic execution", "Randomized lookup", "Discarding state", "Manual override"], correctOptionIndex: 0, solution: "It establishes the standardized operational baseline for the entire subject." },
      { topic: top1, difficulty: "medium", text: `Which architectural property characterizes ${top1}?`, options: ["Linear complexity constraints", "Unbounded resource usage", "Single-point failure", "No validation"], correctOptionIndex: 0, solution: "Predictable bounded resource utilization and standardized interfaces." },
      { topic: top1, difficulty: "hard", text: `Under high concurrency, how should state synchronization in ${top1} be handled?`, options: ["Atomic CAS operations or mutex locking", "Ignoring race conditions", "Global lock on entire application", "Thread termination"], correctOptionIndex: 0, solution: "Atomic Compare-And-Swap (CAS) or fine-grained mutexes prevent data corruption with minimal latency." },

      { topic: top2, difficulty: "easy", text: `In ${top2}, what occurs when an invalid state transition is detected?`, options: ["Exception/Validation error", "Silent memory overwrite", "Process crash without log", "Infinite loop"], correctOptionIndex: 0, solution: "Structured exception handling ensures boundary safety and logs error trace." },
      { topic: top2, difficulty: "medium", text: `How is pipeline throughput maximized in ${top2}?`, options: ["Overlapping decoupled asynchronous stages", "Blocking synchronous waits", "Single thread limit", "Disabling caches"], correctOptionIndex: 0, solution: "Decoupling stages via asynchronous queues balances load and avoids stalling." },
      { topic: top2, difficulty: "hard", text: `What strategy mitigates cascading failures across dependent subsystems in ${top2}?`, options: ["Circuit breakers with exponential backoff", "Instant hard retries in loop", "Dropping all connections", "Ignoring downstream latency"], correctOptionIndex: 0, solution: "Circuit breakers isolate failing nodes and prevent thread pool exhaustion." },

      { topic: top3, difficulty: "easy", text: `What is the primary benefit of optimizing ${top3}?`, options: ["Lower latency and higher resource efficiency", "Increased code complexity only", "Higher power draw", "Decreased observability"], correctOptionIndex: 0, solution: "Optimization minimizes spatial/temporal overhead and elevates system performance." },
      { topic: top3, difficulty: "medium", text: `Which profiling metric indicates bottlenecks in ${top3}?`, options: ["High CPU time in critical inner loops / lock contention", "Constant 0% load", "Clean memory dumps", "Immediate return codes"], correctOptionIndex: 0, solution: "Lock contention and hot loops highlight exact areas requiring algorithmic rework." },
      { topic: top3, difficulty: "hard", text: `Design an optimal memory management scheme for high-throughput ${top3}.`, options: ["Zero-copy ring buffers and object pooling", "Continuous malloc/free per request", "Global heap locking", "Page swapping to disk"], correctOptionIndex: 0, solution: "Object pooling and lock-free ring buffers eliminate GC pauses and memory fragmentation." }
    ];

    try {
      if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'dummy_key') {
        const prompt = `Analyze the following syllabus text and generate a Diagnosis Test.
Create exactly 9 questions broken down by Topic and Difficulty.
Identify 3 main topics. For each topic, create 1 Easy, 1 Medium, and 1 Hard question.
Return STRICTLY as a JSON array of objects:
[
  { "topic": "Topic Name", "difficulty": "easy", "text": "...", "options": ["opt1", "opt2", "opt3", "opt4"], "correctOptionIndex": 0, "solution": "..." }
]
Syllabus Text: ${text.substring(0, 2000)}
Do not include markdown blocks outside the JSON array.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
        });

        let jsonStr = response.text?.replace(/```json/g, '').replace(/```/g, '').trim() || '';
        if (jsonStr) {
          const parsed = JSON.parse(jsonStr);
          if (Array.isArray(parsed) && parsed.length > 0) {
            diagnosisData = parsed;
          }
        }
      }
    } catch (aiErr) {
      console.warn("Diagnose AI generation rate-limited. Using structured fallback.", aiErr);
    }

    try {
      if (session?.user && (session.user as any).id) {
        await connectToDatabase();
        await User.updateOne(
          { _id: (session.user as any).id },
          { $set: { "currentSyllabusData.diagnose": diagnosisData } }
        );
      }
    } catch (dbErr) {
      console.error("Diagnose DB save error:", dbErr);
    }

    return NextResponse.json(diagnosisData);

  } catch (error) {
    console.error('Fatal Diagnose API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
