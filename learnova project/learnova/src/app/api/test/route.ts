import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/User';

export async function GET() {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email: 'subhrojyotidas9e@gmail.com' }).select('+password');
    if (user) {
      return NextResponse.json({ exists: true, passwordHash: user.password });
    } else {
      return NextResponse.json({ exists: false });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
