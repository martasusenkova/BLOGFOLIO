import { IPost } from '../components/Components/PostCard';

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPost[];
}

export const fetchPosts = async (
  offset: number = 0,
  limit: number = 10,
  searchQuery?: string
): Promise<ApiResponse> => {
  const searchParam = searchQuery ? `&search=${searchQuery}` : '';

  try {
    const response = await fetch(
      `https://studapi.teachmeskills.by/blog/posts/?limit=${limit}${searchParam}&offset=${offset}`
    );

    if (!response.ok) {
      throw new Error(`Ошибка API: ${response.statusText}`);
    }

    const data: ApiResponse = await response.json();
    const allPosts = data.results;

    const postsWithShortText = allPosts.map((post) => ({
      ...post,
      text: (post.text && post.text.slice(0, 300) + '.') || '',
    }));

    return {
      ...data,
      results: postsWithShortText,
    };
  } catch (error) {
    console.error('Ошибка при загрузке постов:', error);
    throw error;
  }
};

export const fetchPostById = async (id: number): Promise<IPost> => {
  try {
    const response = await fetch(
      `https://studapi.teachmeskills.by/blog/posts/${id}/`
    );

    if (!response.ok) {
      throw new Error(`Пост с ID ${id} не найден (Статус: ${response.status})`);
    }

    const data: IPost = await response.json();
    return data;
  } catch (error) {
    console.error(`Ошибка при загрузке поста с ID ${id}:`, error);
    throw error;
  }
};
