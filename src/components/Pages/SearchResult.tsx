import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IPost, PostCard } from '../Components/PostCard';
import {
  SearchListWrapper,
  PostLinkWrapper,
} from '../Components/PostList/PostList';
import { fetchPosts } from '../../Api/api';
import FormTemplate from './FormTemplate';
import { useLocation } from 'react-router-dom';

interface SearchResultsResponse {
  results: IPost[];
  count: number;
}

const SearchResultsPage: React.FC = () => {
  const location = useLocation();

  const searchQuery = new URLSearchParams(location.search).get('query') || '';

  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const postsPerPage = 6;

  useEffect(() => {
    if (!searchQuery) {
      setPosts([]);
      setTotalResults(0);
      setLoading(false);
      return;
    }

    const loadPosts = async () => {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * postsPerPage;

        const response = await fetchPosts(offset, postsPerPage, searchQuery);

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
  }, [currentPage, searchQuery]);

  const totalPages = Math.ceil(totalResults / postsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) return <Center>Загрузка результатов...</Center>;

  if (!searchQuery)
    return (
      <FormTemplate
        title={`Search results for '${searchQuery}' (${totalResults} found)`}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={paginate}
      >
        <Center>Введите поисковый запрос, чтобы увидеть результаты.</Center>
      </FormTemplate>
    );

  if (!loading && totalResults === 0)
    return (
      <FormTemplate
        title={`Search results for '${searchQuery}' (${totalResults} found)`}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={paginate}
      ></FormTemplate>
    );

  return (
    <FormTemplate
      title={`Search results for '${searchQuery}' (${totalResults} found)`}
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
