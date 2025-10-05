import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostPreviewState {
  imageUrl: string | null;
}

const initialState: PostPreviewState = {
  imageUrl: null,
};

const postPreviewSlice = createSlice({
  name: 'postPreview',
  initialState,
  reducers: {
    setPreviewImage: (state, action: PayloadAction<string | null>) => {
      state.imageUrl = action.payload;
    },
  },
});

export const { setPreviewImage } = postPreviewSlice.actions;
export default postPreviewSlice.reducer;
