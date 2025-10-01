import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IPost, PostCard } from '../Components/PostCard';
import {
  SearchListWrapper,
  PostLinkWrapper,
} from '../Components/PostList/PostList';
import { fetchPosts } from '../../Api/api';
import FormTemplate from './FormTemplate';

interface SearchResultsResponse {
  results: IPost[];
  count: number;
}

const SEARCH_QUERY = 'Astronauts';

const SearchResultsPage: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const postsPerPage = 6;

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        // 1. Рассчитываем смещение (offset) для запроса к серверу
        const offset = (currentPage - 1) * postsPerPage;

        // 2. Запрашиваем данные с учетом пагинации и поиска
        // ⚠️ ВАЖНО: Ваш fetchPosts должен принимать 3 аргумента (offset, limit, query)
        const response = await fetchPosts(offset, postsPerPage, SEARCH_QUERY);

        // ⚠️ Здесь предполагается, что response имеет поле count
        // Если fetchPosts возвращает только IPost[], это может вызвать ошибку
        const data = response as unknown as SearchResultsResponse;

        setPosts(data.results);
        setTotalResults(data.count);
      } catch (err) {
        console.error('Failed to load search results:', err);
        setPosts([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [currentPage]);

  const totalPages = Math.ceil(totalResults / postsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) return <Center>Загрузка результатов...</Center>;
  if (!loading && totalResults === 0)
    return <Center>По запросу '{SEARCH_QUERY}' ничего не найдено.</Center>;

  return (
    <FormTemplate
      title={`Search results for '${SEARCH_QUERY}' (${totalResults} found)`}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={paginate}
    >
      <SearchListWrapper>
        {posts.map((post) => (
          <PostLinkWrapper key={post.id} to={`/post/${post.id}`}>
            <PostCard post={post} variant="compact-reverse" />
          </PostLinkWrapper>
        ))}
      </SearchListWrapper>
    </FormTemplate>
  );
};

export default SearchResultsPage;

// --- Styled Components ---

const Center = styled.div`
  padding: 40px;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;
