import { configureStore } from '@reduxjs/toolkit';
import postPreviewReducer from './PostPreview';
import favoritesReducer from './FavouritesSlice';
import postsReducer from './PostsSlice';
import reactionsReducer from './UserReactionsSlice';

export const store = configureStore({
  reducer: {
    postPreview: postPreviewReducer,
    posts: postsReducer,
    favorites: favoritesReducer,
    reactions: reactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
