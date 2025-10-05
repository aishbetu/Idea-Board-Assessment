import { configureStore } from '@reduxjs/toolkit'
import ideaReducer from './slices/IdeaSlice';

export const store = configureStore({
  reducer: {
    ideas: ideaReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['ideas/fetchIdeas/fulfilled'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch