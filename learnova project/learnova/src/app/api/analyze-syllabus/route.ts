import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'dummy_key' });

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    // Step 1: Check for API Keys
    if (!process.env.GEMINI_API_KEY || !process.env.YOUTUBE_API_KEY) {
      // Return a mocked response for demo purposes if keys are missing
      return NextResponse.json({
        topic: "Advanced Recursion Strategies",
        videoIds: ["Mv9NEXX1VHc", "8lhxIOVNzx4", "zg-ddPbzcKM"], // CS50 Recursion videos
        questions: [
          { type: "1-mark", question: "What is the primary condition required to stop a recursive function?", solution: "A base case." },
          { type: "3-mark", question: "Explain how the call stack handles recursive function calls.", solution: "Each recursive call adds a new frame to the call stack containing local variables and the return address. When the base case is reached, the stack unwinds, popping each frame and resolving the return values back to the original caller." },
          { type: "5-mark", question: "Write a recursive function in JavaScript to find the nth Fibonacci number and analyze its time complexity.", solution: "```javascript\nfunction fib(n) {\n  if (n <= 1) return n;\n  return fib(n - 1) + fib(n - 2);\n}\n```\nThis naive implementation has a time complexity of O(2^n) because it recalculates the same subproblems multiple times, forming a binary tree of calls." },
          { type: "10-mark", question: "Design an optimized algorithm using memoization for the Fibonacci sequence. Compare its space and time complexity with the naive recursive approach.", solution: "```javascript\nfunction fibMemo(n, memo = {}) {\n  if (n in memo) return memo[n];\n  if (n <= 1) return n;\n  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);\n  return memo[n];\n}\n```\nThe memoized version reduces the time complexity from O(2^n) to O(n) because each number up to n is computed only once. The space complexity is O(n) due to the call stack depth and the memoization object, which is significantly more efficient than the exponential time of the naive approach." }
        ],
        modules: [
          { title: "Introduction to Recursion", description: "Understanding the base case and recursive step." },
          { title: "Call Stack Mechanics", description: "How the browser and OS handle recursive function frames." },
          { title: "Advanced Optimizations", description: "Memoization, tail-call optimization, and dynamic programming." }
        ],
        warning: "Running in mock mode. Add GEMINI_API_KEY and YOUTUBE_API_KEY to .env.local for real API results."
      });
    }

    // Step 2: Use Gemini to extract the primary topic
    const topicPrompt = `Analyze the following syllabus text and identify the single most prominent educational topic or subject being taught. Return ONLY the topic name, nothing else. \n\nSyllabus Text: ${text.substring(0, 2000)}`;
    const topicResponse = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: topicPrompt,
    });
    
    const topic = topicResponse.text?.trim() || "Computer Science";

    // Step 3: Fetch YouTube Videos
    const youtubeRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${encodeURIComponent(topic + " tutorial course")}&type=video&key=${process.env.YOUTUBE_API_KEY}`);
    const youtubeData = await youtubeRes.json();
    const videoIds = youtubeData.items?.map((item: any) => item.id?.videoId).filter(Boolean) || [];

    // Step 4: Generate Questions using Gemini
    const questionsPrompt = `Generate a massive, highly detailed assessment for a student studying: "${topic}".
Create EXACTLY 50 questions distributed as follows:
- Twenty (20) 1-mark Multiple Choice or very short answer questions.
- Fifteen (15) 3-mark short answer questions.
- Ten (10) 5-mark analytical or problem-solving questions.
- Five (5) 10-mark complex essay or design questions.

For the 5-mark and 10-mark questions, provide EXTREMELY detailed, multi-paragraph solutions.

Return the result STRICTLY as a JSON array of objects with the following keys:
"type" (string: "1-mark", "3-mark", "5-mark", or "10-mark")
"question" (string: the question text)
"solution" (string: the detailed solution or answer key)

Do not include any markdown formatting outside of the JSON block. Make sure the JSON is perfectly valid.`;

    const questionsResponse = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: questionsPrompt,
    });

    let questionsStr = questionsResponse.text?.replace(/```json/g, '').replace(/```/g, '').trim() || "[]";
    let questions = [];
    try {
      questions = JSON.parse(questionsStr);
    } catch (e) {
      console.error("Failed to parse Gemini JSON output:", questionsStr);
    }

    // Step 5: Extract Course Modules
    const modulesPrompt = `Based on the following syllabus text, extract exactly 3 distinct learning modules or subtopics.
Return the result STRICTLY as a JSON array of objects with the keys:
"title" (string: short, punchy title)
"description" (string: 1 sentence summary of what will be learned)

Syllabus Text: ${text.substring(0, 3000)}
Do not include markdown blocks outside the JSON array.`;

    const modulesResponse = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: modulesPrompt,
    });

    let modulesStr = modulesResponse.text?.replace(/```json/g, '').replace(/```/g, '').trim() || "[]";
    let modules = [];
    try {
      modules = JSON.parse(modulesStr);
    } catch (e) {
      console.error("Failed to parse Gemini modules JSON:", modulesStr);
    }

    return NextResponse.json({
      topic,
      videoIds,
      questions,
      modules
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
