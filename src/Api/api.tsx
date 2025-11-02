import { IPost } from '../components/Components/PostCard';

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPost[];
}

const BASE_URL = 'https://studapi.teachmeskills.by/';

export const fetchPosts = async (
  offset: number = 0,
  limit: number = 12,
  searchQuery?: string
): Promise<ApiResponse> => {
  const params = new URLSearchParams();
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());
  params.append('author__course_group', '18');
  params.append('ordering', '-id');
  if (searchQuery) params.append('search', searchQuery);

  try {
    const response = await fetch(
      `${BASE_URL}blog/posts/?${params.toString()}`,
      {
        headers: { accept: 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error(`Ошибка API: ${response.statusText}`);
    }

    const data: ApiResponse = await response.json();

    const postsWithShortText = data.results.map((post) => ({
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
    const response = await fetch(`${BASE_URL}blog/posts/${id}/`);

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
