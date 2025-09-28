import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongodb';
import Question from '../../../../models/Question';
import cloudinary from '../../../../lib/cloudinary';

// Ensure Node.js runtime and disable caching for fresh responses
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function uploadToCloudinary(buffer: Buffer, publicId: string) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: 'question-papers',
        public_id: publicId,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
}



export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Validate Cloudinary configuration
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env as Record<string, string | undefined>;
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as unknown as File | null;
    const subjectId = (formData.get('subjectId') as string | null) ?? '';
    const title = (formData.get('title') as string | null) ?? '';
    const year = (formData.get('year') as string | null) ?? '';

    if (!file || typeof (file as any).arrayBuffer !== 'function' || !subjectId || !title || !year) {
      return NextResponse.json(
        { success: false, error: 'All fields are required (title, year, subjectId, file)' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await (file as File).arrayBuffer();
    const buffer = Buffer.from(bytes);

// Upload to Cloudinary with timeout guard
    const uploadResult = await (
      uploadToCloudinary(buffer, `${subjectId}-${Date.now()}`)
    );

    const { secure_url, public_id } = uploadResult as any;

    // Save to database
    const question = new Question({
      subjectId,
      title,
      year,
      fileUrl: secure_url,
      publicId: public_id,
    });

    await question.save();

    return NextResponse.json({ success: true, data: question }, { status: 201 });
  } catch (error: any) {
    console.error('Upload question error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to upload question paper' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get('subjectId');

    if (!subjectId) {
      return NextResponse.json(
        { success: false, error: 'Subject ID is required' },
        { status: 400 }
      );
    }

    const questions = await Question.find({ subjectId }).sort({ year: -1, createdAt: -1 });
    return NextResponse.json({ success: true, data: questions });
  } catch (error) {
    console.error('Get questions error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}
