"use client";

import { useEffect, useRef } from "react";
import Idea from "./Idea";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useIdeasList } from "@/hooks/useIdeas";

const ListIdeas = () => {
  const {
    ideas,
    loading,
    error,
    hasMore,
    loadMore,
    retry,
    handleUpvote,
  } = useIdeasList();

  // Ref for intersection observer
  const observerTarget = useRef<HTMLDivElement>(null);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px' // Start loading 100px before reaching the bottom
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, loadMore]);

  // Initial loading state
  if (loading && ideas.length === 0) {
    return (
      <div className="flex justify-center items-center w-full max-w-4xl py-12">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  // Error state (only if no ideas loaded)
  if (error && ideas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-4xl py-12 gap-4">
        <p className="text-destructive text-center">{error}</p>
        <Button onClick={retry} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  // Empty state
  if (!loading && ideas.length === 0) {
    return (
      <div className="flex justify-center items-center w-full max-w-4xl py-12">
        <p className="text-muted-foreground text-lg">No ideas found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-4xl">
      {/* Ideas List */}
      <div className="flex flex-col gap-6">
        {ideas.map((idea) => (
          <Idea
            key={idea.id}
            id={idea.id}
            title={idea.title}
            upvotes={idea.upvotes}
            handleUpVote={handleUpvote}
          />
        ))}
      </div>

      {/* Intersection Observer Target */}
      <div ref={observerTarget} className="h-20 flex items-center justify-center">
        {loading && hasMore && (
          <Spinner className="h-6 w-6" />
        )}
      </div>

      {/* End of list message */}
      {!hasMore && ideas.length > 0 && (
        <div className="text-center py-8 text-muted-foreground">
          You have reached the end! 🎉
        </div>
      )}

      {/* Error message during infinite scroll */}
      {error && ideas.length > 0 && (
        <div className="flex flex-col items-center py-4 gap-2">
          <p className="text-destructive text-sm">{error}</p>
          <Button 
            onClick={loadMore} 
            variant="ghost" 
            size="sm"
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default ListIdeas;