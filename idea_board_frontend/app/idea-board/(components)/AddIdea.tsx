"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { toast } from 'sonner';
import { useCreateIdea } from '@/hooks/useIdeas';

const MAX_CHARACTERS = 280;

export default function AddIdea() {
  const [idea, setIdea] = useState('');
  const { submitIdea, submitting } = useCreateIdea();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARACTERS) {
      setIdea(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const trimmedIdea = idea.trim();
    
    if (!trimmedIdea) {
      return;
    }

    // Double validation in case user tries developer tools to bypass the limit
    if (trimmedIdea.length > MAX_CHARACTERS) {
      toast.error(`Idea exceeds the maximum length of ${MAX_CHARACTERS} characters.`);
      return;
    }

    const result = await submitIdea(trimmedIdea);
    
    if (result.success) {
      toast.success('Idea submitted successfully!');
      setIdea('');
    } else {
      toast.error(result.error || 'Failed to submit idea. Please try again.');
    }
  };
 
  const remainingChars = MAX_CHARACTERS - idea.length;

  // Dynamic character counter color
  const getCharCounterColor = () => {
    if (remainingChars <= 20) return 'text-orange-500 font-medium';
    if (remainingChars <= 50) return 'text-yellow-600';
    return 'text-gray-400';
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 lg:py-12">
      <Card className="relative overflow-hidden transition-all duration-300">
        {/* Gradient Background Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        
        <CardContent className="p-6 sm:p-8 lg:p-10">
          {/* Title Section */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" />
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
              Share a brilliant idea
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Input Field */}
            <div className="relative">
              <textarea
                value={idea}
                onChange={handleChange}
                placeholder="What's on your mind?"
                rows={3}
                disabled={submitting}
                className="w-full px-4 py-3 sm:px-5 sm:py-4 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-100 transition-all duration-200 outline-none resize-none placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <div className={`absolute bottom-3 right-3 text-xs ${getCharCounterColor()} transition-colors duration-200`}>
                {remainingChars}/{MAX_CHARACTERS}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!idea.trim() || submitting}
                className="group relative px-6 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm sm:text-base font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
              >
                <span className="flex items-center gap-2">
                  {submitting ? 'Submitting...' : 'Submit'}
                  {!submitting && (
                    <svg 
                      className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-200" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </span>
              </button>
            </div>
          </form>

          {/* Optional: Helper Text */}
          <p className="mt-4 text-xs sm:text-sm text-gray-500 text-center">
            Share your thoughts anonymously with the community
          </p>
        </CardContent>
      </Card>
    </div>
  );
}