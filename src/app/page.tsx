'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SubjectForm from '../../components/SubjectForm';
import { Subject } from '../../types';

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubjects = async () => {
    try {
      const response = await fetch('/api/subjects');
      const data = await response.json();
      if (data.success) {
        setSubjects(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch subjects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Subjects Management</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <SubjectForm onSuccess={fetchSubjects} />
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-[#b5ff00] p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4 text-[#111]">All Subjects</h2>
              
              {loading ? (
                <p>Loading...</p>
              ) : subjects.length === 0 ? (
                <p className="text-gray-500">No subjects found.</p>
              ) : (
                <div className="space-y-4 pointer">
                  {subjects.map((subject) => (
                    <div key={subject._id} className="border  rounded-lg cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          
                        </div>
                        <Link
                          href={`/questions/${subject._id}`}
                          className="bg-[#111] text-[#b5ff00] px-4 py-2 rounded hover:bg-[#111] w-full"
                        >
                          <h3 className="font-semibold text-lg"> {subject.code} - {subject.name}</h3>
                          
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}