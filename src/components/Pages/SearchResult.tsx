import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IPost, PostCard } from '../PostCard';
import { fetchPosts } from '../../Api/api';
import FormTemplate from './FormTemplate';

const SearchResultsPage: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postsData = await fetchPosts();
        setPosts(postsData);
      } catch (err) {
        console.error('Failed to load posts:', err);
      }
    };
    loadPosts();
  }, []);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <FormTemplate
      title="Search results 'Astronauts'"
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={paginate}
    >
      <PostListWrapper>
        {currentPosts.map((post) => (
          <PostCardWrapper key={post.id}>
            <PostCard post={post} variant="compact-reverse" />
          </PostCardWrapper>
        ))}
      </PostListWrapper>
    </FormTemplate>
  );
};

export default SearchResultsPage;

// --- Styled Components ---

const PostListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  margin: 0;
`;

const PostCardWrapper = styled.div`
  padding: 0;
  &:last-child {
    margin-bottom: 20px;
  }
`;
