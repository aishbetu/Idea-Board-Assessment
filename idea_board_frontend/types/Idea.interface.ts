export interface IdeaInterface {
    id: number;
    title: string;
    upvotes: number;
    handleUpVote: (id: number) => void;
}

export interface IdeaResponse {
    id: number;
    title: string;
    upvotes: number;
    createdAt: string;
}

export interface IdeaInterfaceWithoutHandler {
    id: number;
    title: string;
    upvotes: number;
}

export interface IdeasApiResponse {
  ideas: IdeaResponse[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiErrorResponse {
  message?: string;
}

export interface IdeaState {
  ideas: IdeaResponse[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  total: number;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  submitting: boolean;
}