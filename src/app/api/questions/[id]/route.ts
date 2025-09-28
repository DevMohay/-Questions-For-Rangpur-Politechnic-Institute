import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/mongodb';
import Question from '../../../../../models/Question';
import cloudinary from '../../../../../lib/cloudinary';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }

) 
{
  try {
    await connectDB();
    const question = await Question.findById(params.id);

    if (!question) {
      return NextResponse.json(
        { success: false, error: 'Question paper not found' },
        { status: 404 }
      );
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(question.publicId);

    // Delete from database
    await Question.findByIdAndDelete(params.id);

    return NextResponse.json({ success: true, message: 'Question paper deleted successfully' });
  } catch (error) {
    console.error('Delete question error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete question paper' },
      { status: 500 }
    );
  }
}