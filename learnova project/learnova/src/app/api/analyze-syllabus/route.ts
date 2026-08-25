import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectToDatabase from '@/lib/db';
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'dummy_key' });

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    // Advanced OCR Noise Cleaner & Academic Topic Extractor
    const cleanLines = text
      .split('\n')
      .map((l: string) => l.trim().replace(/[^\w\s\-\:\.\,]/gi, ''))
      .filter((l: string) => {
        // Filter out short garbage, OCR artifacts, or mostly non-alpha strings
        const words = l.split(/\s+/).filter(w => w.length > 2);
        const alphaCount = (l.match(/[a-zA-Z]/g) || []).length;
        return words.length >= 2 && alphaCount >= 8 && (alphaCount / l.length) > 0.6;
      });

    // Detect academic headings or keywords
    const academicKeywordRegex = /(course|syllabus|subject|unit|module|chapter|introduction|fundamentals|principles|engineering|computer|science|data|structures|algorithms|programming|database|network|ai|learning|physics|mathematics|management|system)/i;
    
    let detectedTopic = "";
    for (const line of cleanLines) {
      if (academicKeywordRegex.test(line) && line.length < 80) {
        // Clean line from prefixes like "Course Title:", "Subject:", etc.
        detectedTopic = line.replace(/^(course\s*(title|name)?|subject|syllabus\s*(for)?|unit\s*\d*|module\s*\d*)\s*[:\-\.]\s*/i, '').trim();
        if (detectedTopic.length >= 4) break;
      }
    }

    if (!detectedTopic) {
      // Pick the cleanest first line that looks like a title
      detectedTopic = cleanLines[0] ? cleanLines[0].substring(0, 60) : "Computer Science & Engineering";
    }

    // Sanitize topic to ensure it's not gibberish
    const fallbackTopic = detectedTopic.length > 3 ? detectedTopic : "Computer Science & Engineering";
    
    // Extract 3 clean module titles
    const candidateModules = cleanLines.filter(l => l.toLowerCase() !== fallbackTopic.toLowerCase());
    const fallbackModules = [
      { 
        title: candidateModules[0] ? candidateModules[0].substring(0, 45) : "Foundational Concepts & Architecture", 
        description: candidateModules[1] ? candidateModules[1].substring(0, 120) : "Core theoretical foundations, syntax, and foundational execution models." 
      },
      { 
        title: candidateModules[2] ? candidateModules[2].substring(0, 45) : "Intermediate Implementation & Data Structures", 
        description: candidateModules[3] ? candidateModules[3].substring(0, 120) : "Deep dive into structural execution, algorithm design, and state management." 
      },
      { 
        title: candidateModules[4] ? candidateModules[4].substring(0, 45) : "Advanced Systems & Performance Optimization", 
        description: candidateModules[5] ? candidateModules[5].substring(0, 120) : "Complex problem-solving, architectural design patterns, and scaling." 
      }
    ];

    const fallbackQuestions = [
      { type: "1-mark", question: `What is the primary objective of studying ${fallbackTopic}?`, solution: `The primary objective is to understand core foundational principles, methodologies, and systematic application in problem-solving.` },
      { type: "1-mark", question: `Define the primary mechanism used in ${fallbackModules[0].title}.`, solution: `It utilizes standardized rule-based architectures and iterative verification steps.` },
      { type: "1-mark", question: `State one key advantage of optimizing ${fallbackModules[1].title}.`, solution: `Reduces computational and structural complexity while maximizing throughput.` },
      { type: "1-mark", question: `Which operational constraint must always be respected in ${fallbackTopic}?`, solution: `Boundary validation, memory safety, and state termination conditions.` },
      { type: "1-mark", question: `What is the standard notation for evaluating algorithmic efficiency in ${fallbackTopic}?`, solution: `Big-O asymptotic notation for worst-case time and space complexity.` },
      { type: "3-mark", question: `Explain the fundamental difference between sequential execution and optimized pipeline flow in ${fallbackTopic}.`, solution: `Sequential execution processes stages synchronously leading to bottlenecks, whereas pipelining overlaps instructions and stages to enhance throughput.` },
      { type: "3-mark", question: `Describe how state transitions are tracked across ${fallbackModules[1].title}.`, solution: `State transitions are logged through deterministic transition tables or frame pointers maintaining consistency across execution bounds.` },
      { type: "3-mark", question: `Analyze the trade-offs between memory footprint and execution speed in ${fallbackTopic}.`, solution: `Techniques like memoization and caching decrease execution latency at the cost of higher spatial memory consumption.` },
      { type: "5-mark", question: `Formulate a structured implementation strategy for ${fallbackModules[2].title} with error handling.`, solution: `A complete modular approach requires: 1) Input validation and normalization, 2) Core transform logic with boundary checking, 3) Exception catching with rollback mechanisms, and 4) State persistence.` },
      { type: "10-mark", question: `Design an end-to-end architecture addressing scalable processing and fault tolerance for ${fallbackTopic}.`, solution: `An enterprise-grade design incorporates: 1) Distributed node coordination with leader election, 2) Idempotent operation queues, 3) Partitioned storage schemas with redundancy, and 4) Continuous telemetry and automated recovery pipelines.` }
    ];

    let topic = fallbackTopic;
    let questions = fallbackQuestions;
    let modules = fallbackModules;
    // Verified educational lecture videos as default fallback (Harvard CS50 / MIT OCW / freeCodeCamp)
    let videoIds: string[] = ["8jLOx1hD3_o", "Mv9NEXX1VHc", "zg-ddPbzcKM"];

    // Try Gemini AI with safe fallback
    try {
      if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'dummy_key') {
        const topicPrompt = `Analyze the following syllabus text and extract the concise academic course title or main subject (e.g. "Data Structures and Algorithms", "Operating Systems", "Organic Chemistry", "Financial Management"). Do NOT return OCR noise or header junk. Return ONLY the clean topic name, nothing else. \n\nSyllabus Text: ${text.substring(0, 2000)}`;
        const topicResponse = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: topicPrompt,
        });
        
        const candidateAiTopic = topicResponse.text?.trim().replace(/^["']|["']$/g, '');
        if (candidateAiTopic && candidateAiTopic.length >= 4 && candidateAiTopic.length < 80 && !candidateAiTopic.includes('\n')) {
          topic = candidateAiTopic;
        }

        const questionsPrompt = `Generate a detailed assessment for a student studying: "${topic}".
Create EXACTLY 10 questions to serve as a preview.
Distribute as follows:
- Five (5) 1-mark Multiple Choice or very short answer questions.
- Three (3) 3-mark short answer questions.
- One (1) 5-mark analytical or problem-solving question.
- One (1) 10-mark complex essay or design question.

Return the result STRICTLY as a JSON array of objects with keys "type", "question", "solution".
Syllabus: ${text.substring(0, 2000)}`;

        const modulesPrompt = `Based on the following syllabus text, extract exactly 3 distinct learning modules or subtopics for "${topic}".
Return STRICTLY as a JSON array of objects with keys "title", "description".
Syllabus: ${text.substring(0, 2000)}`;

        const [qRes, mRes] = await Promise.allSettled([
          ai.models.generateContent({ model: 'gemini-3.6-flash', contents: questionsPrompt }),
          ai.models.generateContent({ model: 'gemini-3.6-flash', contents: modulesPrompt })
        ]);

        if (qRes.status === 'fulfilled' && qRes.value.text) {
          const cleanQ = qRes.value.text.replace(/```json/g, '').replace(/```/g, '').trim();
          try {
            const parsedQ = JSON.parse(cleanQ);
            if (Array.isArray(parsedQ) && parsedQ.length > 0) questions = parsedQ;
          } catch (e) {
            console.warn("Could not parse AI questions, using structured fallback");
          }
        }

        if (mRes.status === 'fulfilled' && mRes.value.text) {
          const cleanM = mRes.value.text.replace(/```json/g, '').replace(/```/g, '').trim();
          try {
            const parsedM = JSON.parse(cleanM);
            if (Array.isArray(parsedM) && parsedM.length > 0) modules = parsedM;
          } catch (e) {
            console.warn("Could not parse AI modules, using structured fallback");
          }
        }
      }
    } catch (aiErr) {
      console.warn("Gemini AI call rate-limited. Employing smart academic OCR fallback.", aiErr);
    }

    // Clean search term for educational YouTube query
    const cleanSearchTopic = topic.replace(/[^a-zA-Z0-9\s]/g, ' ').trim();
    const searchQuery = `${cleanSearchTopic} full course tutorial lecture`;

    // Try YouTube Fetch with strict educational filters
    try {
      if (process.env.YOUTUBE_API_KEY) {
        const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${encodeURIComponent(searchQuery)}&type=video&videoEmbeddable=true&videoDuration=long&videoCategoryId=27&key=${process.env.YOUTUBE_API_KEY}`;
        const youtubeRes = await fetch(youtubeUrl);
        const youtubeData = await youtubeRes.json();
        let fetchedVideos = youtubeData.items?.map((item: any) => item.id?.videoId).filter(Boolean) || [];

        // Fallback without category constraint if 0 educational videos found
        if (fetchedVideos.length === 0) {
          const broadUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${encodeURIComponent(searchQuery)}&type=video&videoEmbeddable=true&videoDuration=medium&key=${process.env.YOUTUBE_API_KEY}`;
          const broadRes = await fetch(broadUrl);
          const broadData = await broadRes.json();
          fetchedVideos = broadData.items?.map((item: any) => item.id?.videoId).filter(Boolean) || [];
        }

        if (fetchedVideos.length > 0) {
          videoIds = fetchedVideos;
        }
      }
    } catch (ytErr) {
      console.warn("YouTube fetch error, using curated academic lectures.", ytErr);
    }

    // Attempt to save to DB
    try {
      const session = await getServerSession(authOptions);
      if (session?.user && (session.user as any).id) {
        await connectToDatabase();
        const User = (await import('@/lib/models/User')).default;
        await User.updateOne(
          { _id: (session.user as any).id },
          { $set: { "currentSyllabusData.core": { topic, modules, questions, videoIds } } }
        );
      }
    } catch (dbErr) {
      console.error("Database save error:", dbErr);
    }

    return NextResponse.json({
      topic,
      videoIds,
      questions,
      modules
    });

  } catch (error) {
    console.error('Fatal API Error in analyze-syllabus:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
