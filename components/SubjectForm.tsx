'use client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface SubjectFormProps {
  onSuccess: () => void;
}

export default function SubjectForm({ onSuccess }: SubjectFormProps) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/subjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, code }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Subject added successfully!');
        setName('');
        setCode('');
        onSuccess();
      } else {
        toast.error(data.error || 'Failed to add subject');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#111] p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Subject</h2>
      
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Subject Name *
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b5ff00]"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
          Subject Code
        </label>
        <input
          type="text"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b5ff00]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#b5ff00] text-[#111] py-2 px-4 rounded-md hover:bg-[#a4e600] disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add Subject'}
      </button>
    </form>
  );
}