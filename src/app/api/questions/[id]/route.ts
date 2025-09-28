import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/mongodb';
import Question from '../../../../../models/Question';
import cloudinary from '../../../../../lib/cloudinary';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const question = await Question.findById(id);

    if (!question) {
      return NextResponse.json(
        { success: false, error: 'Question paper not found' },
        { status: 404 }
      );
    }

    if (question.publicId) {
      await cloudinary.uploader.destroy(question.publicId);
    }

    await Question.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Question paper deleted successfully',
    });
  } catch (error) {
    console.error('Delete question error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete question paper' },
      { status: 500 }
    );
  }
}