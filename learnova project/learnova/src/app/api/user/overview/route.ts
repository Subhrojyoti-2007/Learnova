import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectToDatabase from '@/lib/db';
import { UserProgress, KnowledgeGap, LearningTask, ModuleProgress } from '@/lib/models/Progress';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    
    const userId = (session.user as any).id;

    // Fetch all related data in parallel
    const [userDoc, progress, gaps, tasks, modules] = await Promise.all([
      import('@/lib/models/User').then(m => m.default.findById(userId)),
      UserProgress.findOne({ userId }),
      KnowledgeGap.find({ userId }),
      LearningTask.find({ userId }).sort({ order: 1 }),
      ModuleProgress.find({ userId })
    ]);

    return NextResponse.json({
      user: userDoc || {
        name: session.user.name,
        email: session.user.email
      },
      progress: progress || {
        overallMastery: 0,
        conceptsMastered: 0,
        learningStreakDays: 0,
        knowledgeGapsCount: 0,
        progressHistory: []
      },
      knowledgeGaps: gaps || [],
      learningTasks: tasks || [],
      moduleProgress: modules || []
    });
  } catch (error) {
    console.error('Error fetching overview data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
