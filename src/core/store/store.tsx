import { configureStore } from '@reduxjs/toolkit';
import postPreviewReducer from '../PostPreview';
import authReducer from './auth/authSlice';

export const store = configureStore({
  reducer: {
    postPreview: postPreviewReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
