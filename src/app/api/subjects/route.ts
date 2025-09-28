import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongodb';
import Subject from '../../../../models/Subject';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const subjects = await Subject.find({}).sort({ name: 1 });
    return NextResponse.json({ success: true, data: subjects });
  } catch (error) {
    console.error('Get subjects error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subjects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, code } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Subject name is required' },
        { status: 400 }
      );
    }

    const subject = new Subject({ name, code });
    await subject.save();

    return NextResponse.json({ success: true, data: subject }, { status: 201 });
  } catch (error: unknown) {
    console.error('Create subject error:', error);

    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: number }).code === 11000
    ) {
      return NextResponse.json(
        { success: false, error: 'Subject with this name already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create subject' },
      { status: 500 }
    );
  }
}
