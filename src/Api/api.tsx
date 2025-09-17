import { IPost } from '../components/PostCard';

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPost[];
}

export const fetchPosts = async (): Promise<IPost[]> => {
  try {
    const response = await fetch(
      'https://studapi.teachmeskills.by/blog/posts/?limit=12&search=astronaut'
    );
    const data: ApiResponse = await response.json();
    const allPosts = data.results;

    const postsWithShortText = allPosts.map((post) => ({
      ...post,
      text: (post.text && post.text.slice(0, 300) + '.') || '',
    }));

    return postsWithShortText;
  } catch (error) {
    console.error('Ошибка при загрузке постов:', error);
    throw error;
  }
};

export const fetchPostsFull = async (): Promise<IPost[]> => {
  try {
    const response = await fetch(
      'https://studapi.teachmeskills.by/blog/posts/?limit=12&search=astronaut'
    );
    const data: ApiResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Ошибка при загрузке постов:', error);
    throw error;
  }
};
