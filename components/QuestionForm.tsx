'use client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface QuestionFormProps {
  subjectId: string;
  onSuccess: () => void;
}

export default function QuestionForm({ subjectId, onSuccess }: QuestionFormProps) {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      toast.error('Please select title');
      return;
    }

    if (!file) {
      toast.error('Please select a file');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

      formData.append('file', file);
      formData.append('subjectId', subjectId);
      formData.append('title', title);
      formData.append('year', today);

      const response = await fetch('/api/questions', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Question paper uploaded successfully!');
        setTitle('');
        setFile(null);
        onSuccess();
      } else {
        toast.error(data.error || 'Failed to upload question paper');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#111] p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload Question Paper</h2>

      {/* Title Select */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
          Title *
        </label>
        <select
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border bg-[#222] text-white border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b5ff00]"
        >
          <option value="">-- Select Title --</option>
          <option value="Midterm">Midterm</option>
          <option value="Board">Board</option>
        </select>
      </div>

      {/* File Upload */}
      <div className="mb-4">
        <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-2">
          File *
        </label>
        <input
          type="file"
          id="file"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
          className="w-full px-3 py-2 border border-gray-600 bg-[#222] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#b5ff00]"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#b5ff00] text-[#111] py-2 px-4 rounded-md hover:bg-[#a4e600] disabled:opacity-50 font-semibold"
      >
        {loading ? 'Uploading...' : 'Upload Question Paper'}
      </button>
    </form>
  );
}
