'use client';
import { useState } from 'react';
import { Question } from '../types';
import { toast } from 'react-hot-toast';

interface QuestionListProps {
  questions: Question[];
  onDelete: () => void;
}

export default function QuestionList({ questions, onDelete }: QuestionListProps) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question paper?')) return;

    try {
      const response = await fetch(`/api/questions/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Question paper deleted successfully!');
        onDelete();
      } else {
        toast.error(data.error || 'Failed to delete question paper');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const closeViewer = () => setCurrentIndex(null);

  const showPrev = () => {
    if (currentIndex === null) return;
    setCurrentIndex((prev) => (prev! - 1 + questions.length) % questions.length);
  };

  const showNext = () => {
    if (currentIndex === null) return;
    setCurrentIndex((prev) => (prev! + 1) % questions.length);
  };

  return (
    <div className="bg-[#111] p-6 rounded-lg shadow-md">
      <h2 className="text-xl text-[#b5ff00] font-bold mb-4">Question Papers</h2>

      {questions.length === 0 ? (
        <p className="text-gray-500">No question papers found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {questions.map((question, idx) => (
            <div key={question._id} className="relative border border-[#b5ff00] rounded-lg overflow-hidden">
              {/* Image preview */}
              <img
                src={question.fileUrl}
                alt={question.title}
                className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition"
                onClick={() => setCurrentIndex(idx)}
              />

              {/* year/title overlay */}
              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {question.title} ({question.year})
              </div>

              {/* delete button */}
              <button
                onClick={() => handleDelete(question._id)}
                className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Viewer */}
      {currentIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          {/* Close Button */}
          <button
            onClick={closeViewer}
            className="absolute top-5 right-5 text-[#111] text-3xl font-bold bg-[#b5ff00] rounded-full p-2"
          >
            ✕
          </button>

          {/* Prev Button */}
          <button
            onClick={showPrev}
            className="absolute left-5 text-[#111] text-4xl font-bold px-3 py-1 bg-[#b5ff00] rounded-full p-2"
          >
            ‹
          </button>

          {/* Next Button */}
          <button
            onClick={showNext}
            className="absolute right-5 text-[#111] text-4xl font-bold px-3 py-1 bg-[#b5ff00] rounded-full p-2"
          >
            ›
          </button>

          {/* Image + Caption */}
          <div className="text-center">
            <img
              src={questions[currentIndex].fileUrl}
              alt={questions[currentIndex].title}
              className="max-h-[80vh] max-w-[90vw] object-contain mx-auto"
            />
            <p className="text-white mt-4 text-sm">
              {questions[currentIndex].title} ({questions[currentIndex].year})
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
