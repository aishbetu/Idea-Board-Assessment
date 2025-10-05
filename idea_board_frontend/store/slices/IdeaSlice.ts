import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/api';
import { AxiosError } from 'axios';
import { IdeasApiResponse as ApiResponse, ApiErrorResponse, IdeaState } from '@/types/Idea.interface';

// Initial state
const initialState: IdeaState = {
  ideas: [],
  currentPage: 1,
  totalPages: 1,
  pageSize: 10,
  total: 0,
  loading: false,
  error: null,
  hasMore: true,
  submitting: false,
};

// Helper function to extract error message
const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as ApiErrorResponse;
    return apiError?.message || error.message || 'An error occurred';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
};

// Async thunks
export const fetchIdeas = createAsyncThunk(
  'ideas/fetchIdeas',
  async ({ page, append }: { page: number; append: boolean }, { rejectWithValue }) => {
    try {
      const response = await api.get<ApiResponse>(
        `/ideas?page=${page}&pageSize=${initialState.pageSize}`
      );
      return { data: response.data, append };
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error) || 'Failed to fetch ideas');
    }
  }
);

export const createIdea = createAsyncThunk(
  'ideas/createIdea',
  async (title: string, { rejectWithValue }) => {
    try {
      await api.post('/ideas/new', { title });
      return title;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error) || 'Failed to create idea');
    }
  }
);

export const upvoteIdea = createAsyncThunk(
  'ideas/upvoteIdea',
  async (id: number, { rejectWithValue }) => {
    try {
      await api.put(`ideas/upvote/${id}`);
      return id;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error) || 'Failed to upvote idea');
    }
  }
);

// Slice
const ideaSlice = createSlice({
  name: 'ideas',
  initialState,
  reducers: {
    resetIdeas: (state) => {
      state.ideas = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.error = null;
      state.hasMore = true;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch ideas
    builder
      .addCase(fetchIdeas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIdeas.fulfilled, (state, action: PayloadAction<{ data: ApiResponse; append: boolean }>) => {
        const { data, append } = action.payload;
        
        state.loading = false;
        state.currentPage = data.page;
        state.totalPages = data.totalPages;
        state.total = data.total;
        state.hasMore = data.page < data.totalPages;
        
        if (append) {
          // Append for infinite scroll - prevent duplicates
          const existingIds = new Set(state.ideas.map(idea => idea.id));
          const newIdeas = data.ideas.filter(idea => !existingIds.has(idea.id));
          state.ideas = [...state.ideas, ...newIdeas];
        } else {
          // Replace for initial load or refresh
          state.ideas = data.ideas;
        }
      })
      .addCase(fetchIdeas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create idea
    builder
      .addCase(createIdea.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createIdea.fulfilled, (state) => {
        state.submitting = false;
        // Reset to page 1 to show the new idea
        state.currentPage = 1;
      })
      .addCase(createIdea.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload as string;
      });

    // Upvote idea
    builder
      .addCase(upvoteIdea.pending, (state) => {
        state.error = null;
      })
      .addCase(upvoteIdea.fulfilled, (state, action: PayloadAction<number>) => {
        // Optimistically update the upvote count
        const idea = state.ideas.find(idea => idea.id === action.payload);
        if (idea) {
          idea.upvotes += 1;
        }
      })
      .addCase(upvoteIdea.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { resetIdeas, clearError } = ideaSlice.actions;
export default ideaSlice.reducer;