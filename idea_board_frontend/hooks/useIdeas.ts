import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchIdeas, createIdea, upvoteIdea, clearError } from '@/store/slices/IdeaSlice';

/**
 * Custom hook for managing ideas list with infinite scroll
 */
export const useIdeasList = () => {
  const dispatch = useAppDispatch();
  
  const {
    ideas,
    currentPage,
    totalPages,
    loading,
    error,
    hasMore,
  } = useAppSelector((state) => state.ideas);

  // Fetch initial ideas on mount
  useEffect(() => {
    dispatch(fetchIdeas({ page: 1, append: false }));
  }, [dispatch]);

  // Load more ideas for infinite scroll
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(fetchIdeas({ page: currentPage + 1, append: true }));
    }
  }, [dispatch, currentPage, hasMore, loading]);

  // Refresh ideas list (useful after creating a new idea)
  const refresh = useCallback(() => {
    dispatch(fetchIdeas({ page: 1, append: false }));
  }, [dispatch]);

  // Retry on error
  const retry = useCallback(() => {
    dispatch(clearError());
    dispatch(fetchIdeas({ page: 1, append: false }));
  }, [dispatch]);

  // Upvote an idea
  const handleUpvote = useCallback(async (id: number) => {
    await dispatch(upvoteIdea(id));
  }, [dispatch]);

  return {
    ideas,
    loading,
    error,
    hasMore,
    currentPage,
    totalPages,
    loadMore,
    refresh,
    retry,
    handleUpvote,
  };
};

/**
 * Custom hook for creating new ideas
 */
export const useCreateIdea = () => {
  const dispatch = useAppDispatch();
  const { submitting, error } = useAppSelector((state) => state.ideas);

  const submitIdea = useCallback(async (title: string) => {
    const result = await dispatch(createIdea(title));
    
    if (createIdea.fulfilled.match(result)) {
      // After successful creation, refresh the ideas list
      await dispatch(fetchIdeas({ page: 1, append: false }));
      return { success: true };
    } else {
      return { success: false, error: result.payload as string };
    }
  }, [dispatch]);

  const clearSubmitError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    submitIdea,
    submitting,
    error,
    clearSubmitError,
  };
};