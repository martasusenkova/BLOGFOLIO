import { fetchPosts, fetchPostById } from '../api';
import { IPost } from '../../components/Components/PostCard';

const mockPost: IPost = {
  id: 1,
  title: 'Test Post',
  text: 'Some text...',
  author: 1,
  image: 'https://example.com/image.jpg',
  date: '2025-10-29',
  lesson_num: 1,
  description: 'Short description',
};

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

test('fetchPosts returns data', async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      count: 1,
      next: null,
      previous: null,
      results: [mockPost],
    }),
  });

  const data = await fetchPosts();
  expect(data.results).toHaveLength(1);
  expect(data.results[0].title).toBe('Test Post');
});

test('fetchPostById returns a single post', async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => mockPost,
  });

  const post = await fetchPostById(1);
  expect(post.id).toBe(1);
  expect(post.title).toBe('Test Post');
});
