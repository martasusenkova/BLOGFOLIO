import { configureStore } from '@reduxjs/toolkit';
import postPreviewReducer from './PostPreview';

export const store = configureStore({
  reducer: {
    postPreview: postPreviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
