import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/User';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, institution, gradeLevel, fieldOfStudy, learningGoals } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      institution,
      gradeLevel,
      fieldOfStudy,
      learningGoals,
    });

    return NextResponse.json({ message: 'User registered successfully', userId: newUser._id }, { status: 201 });
  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json({ message: 'An error occurred during registration', error: error.message }, { status: 500 });
  }
}
