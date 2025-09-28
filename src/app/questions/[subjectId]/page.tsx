'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import QuestionForm from '../../../../components/QuestionForm';
import QuestionList from '../../../../components/QuestionList';
import { Subject, Question } from '../../../../types';

export default function QuestionsPage() {
  const params = useParams();
  const router = useRouter();
  const subjectId = params.subjectId as string;
  
  const [subject, setSubject] = useState<Subject | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubject = async () => {
    try {
      const response = await fetch('/api/subjects');
      const data = await response.json();
      if (data.success) {
        const foundSubject = data.data.find((s: Subject) => s._id === subjectId);
        setSubject(foundSubject || null);
      }
    } catch (error) {
      console.error('Failed to fetch subject:', error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`/api/questions?subjectId=${subjectId}`);
      const data = await response.json();
      if (data.success) {
        setQuestions(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubject();
    fetchQuestions();
  }, [subjectId]);

  if (!subject && !loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Subject not found</h1>
          <button
            onClick={() => router.back()}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-[#111] mb-4"
          >
            ← Back to Subjects
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {subject?.code || 'Code...'} {subject?.name || 'Loading...'}
          </h1>
          
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <QuestionForm subjectId={subjectId} onSuccess={fetchQuestions} />
          </div>
          
          <div className="lg:col-span-2">
            {loading ? (
              <p>Loading questions...</p>
            ) : (
              <QuestionList questions={questions} onDelete={fetchQuestions} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}