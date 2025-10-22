import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '../../components/Components/PostCard';
import { fetchPosts, fetchPostById } from '../../Api/api';

interface PostsState {
  posts: IPost[];
  selectedPost: IPost | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: null,
};

export const loadPostById = createAsyncThunk(
  'posts/loadPostById',
  async (id: number) => {
    const post = await fetchPostById(id);
    return post;
  }
);
export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async (params: {
    offset?: number;
    limit?: number;
    groupId?: number;
    searchQuery?: string;
  }) => {
    const { offset = 0, limit = 12, groupId, searchQuery } = params;

    let query = `?limit=${limit}&offset=${offset}`;
    if (searchQuery) query += `&search=${searchQuery}`;
    if (groupId) query += `&author__course_group=${groupId}`;
    const data = await fetchPosts(0, 12, query);
    return data.results;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadPosts.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке постов';
      })
      .addCase(loadPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadPostById.fulfilled,
        (state, action: PayloadAction<IPost>) => {
          state.loading = false;
          state.selectedPost = action.payload;
        }
      )
      .addCase(loadPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке поста';
      });
  },
});

export default postsSlice.reducer;
