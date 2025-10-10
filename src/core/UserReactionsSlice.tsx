import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserReactionsState {
  likedIds: number[];
  dislikedIds: number[];
}

const initialReactionsState: UserReactionsState = {
  likedIds: [],
  dislikedIds: [],
};

const userReactionsSlice = createSlice({
  name: 'reactions',
  initialState: initialReactionsState,
  reducers: {
    toggleLike: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      const index = state.likedIds.indexOf(postId);

      if (index !== -1) {
        state.likedIds.splice(index, 1);
      } else {
        state.likedIds.push(postId);
        const dislikeIndex = state.dislikedIds.indexOf(postId);
        if (dislikeIndex !== -1) {
          state.dislikedIds.splice(dislikeIndex, 1);
        }
      }
    },

    toggleDislike: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      const index = state.dislikedIds.indexOf(postId);

      if (index !== -1) {
        state.dislikedIds.splice(index, 1);
      } else {
        state.dislikedIds.push(postId);
        const likeIndex = state.likedIds.indexOf(postId);
        if (likeIndex !== -1) {
          state.likedIds.splice(likeIndex, 1);
        }
      }
    },
  },
});

export const { toggleLike, toggleDislike } = userReactionsSlice.actions;
export default userReactionsSlice.reducer;
