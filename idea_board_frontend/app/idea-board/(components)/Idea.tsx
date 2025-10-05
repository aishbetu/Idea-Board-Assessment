"use client"
import { Card, CardContent } from '@/components/ui/card';
import { IdeaInterface } from '@/types/Idea.interface';
import { ThumbsUp } from 'lucide-react';


const Idea: React.FC<IdeaInterface> = ({ id, title, upvotes, handleUpVote }) => {

  return (
    <Card className="relative overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg">      
      <CardContent className="px-4 sm:px-5">
        <div className="flex items-center justify-between gap-4">
          {/* Title */}
          <h3 className="text-sm sm:text-base text-gray-700 flex-1 min-w-0 break-words leading-relaxed">
            {title}
          </h3>

          {/* Upvote Button */}
          <button
            onClick={() => handleUpVote(id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200`}
          >
            <ThumbsUp className={`w-4 h-4`} />
            <span className="text-sm font-semibold">{upvotes}</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Idea;