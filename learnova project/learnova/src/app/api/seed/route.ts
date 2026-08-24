import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/User';
import { UserProgress, KnowledgeGap, LearningTask, ModuleProgress } from '@/lib/models/Progress';
import bcrypt from 'bcryptjs';

export async function POST() {
  try {
    await connectToDatabase();

    // 1. Create a test user if one doesn't exist
    const testEmail = 'test@example.com';
    let user = await User.findOne({ email: testEmail });
    
    if (!user) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      user = await User.create({
        name: 'Alex Developer',
        email: testEmail,
        password: hashedPassword,
      });
    }

    const userId = user._id;

    // Clear existing data for this user
    await UserProgress.deleteMany({ userId });
    await KnowledgeGap.deleteMany({ userId });
    await LearningTask.deleteMany({ userId });
    await ModuleProgress.deleteMany({ userId });

    // 2. Create UserProgress
    const today = new Date();
    const history = [];
    // Generate 7 days of mock history
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const base = 65;
      const variation = [0, 3, 2, 5, 7, 8, 9][6-i];
      history.push({
        date,
        mastery: base + variation
      });
    }

    await UserProgress.create({
      userId,
      overallMastery: 74,
      conceptsMastered: 28,
      learningStreakDays: 8,
      knowledgeGapsCount: 6,
      progressHistory: history
    });

    // 3. Create Knowledge Gaps
    await KnowledgeGap.create([
      { userId, title: 'Call Stack', mastery: 31, status: 'Critical', color: 'rose', isRootGap: true },
      { userId, title: 'Recursion', mastery: 44, status: 'Weak', color: 'orange', isRootGap: false },
      { userId, title: 'Pointers', mastery: 58, status: 'Developing', color: 'amber', isRootGap: false },
      { userId, title: 'Graphs', mastery: 67, status: 'Developing', color: 'blue', isRootGap: false },
    ]);

    // 4. Create Learning Tasks
    await LearningTask.create([
      { userId, title: 'Review Functions', durationMin: 10, type: 'Completed', isCompleted: true, order: 1 },
      { userId, title: 'Repair Call Stack', durationMin: 15, type: 'Priority', isCompleted: false, link: '/repair', order: 2 },
      { userId, title: '5 Recursion Questions', durationMin: 8, type: 'Practice', isCompleted: false, order: 3 },
      { userId, title: 'Retention Check', durationMin: 5, type: 'Quiz', isCompleted: false, order: 4 },
    ]);

    // 5. Create Module Progress
    await ModuleProgress.create([
      { userId, title: 'Recursion Fundamentals', modulesLeft: 4, estimatedMinutesLeft: 45, progressPercentage: 76, themeColor: 'primary', link: '/learn/recursion' },
      { userId, title: 'Binary Search', modulesLeft: 7, estimatedMinutesLeft: 75, progressPercentage: 42, themeColor: 'blue', link: '/learn/binary-search' },
    ]);

    return NextResponse.json({ message: 'Seed data generated successfully for user test@example.com (password: password123)' }, { status: 200 });

  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Failed to seed data' }, { status: 500 });
  }
}
