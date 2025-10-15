import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { PostCard, IPost, PostVariant } from '../../Components/PostCard';
import { fetchPosts } from '../../../Api/api';
import useWindowWidth from '../../../Hooks/useWindowWidth';
import { Link } from 'react-router-dom';

interface PostListProps {
  layout: PostVariant;
  searchQuery?: string;
  posts: IPost[];
}

const PostList: React.FC<PostListProps> = ({ layout, searchQuery }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const width = useWindowWidth();
  const isComplexLayout = width >= 950;

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const postsData = await fetchPosts(0, 12, searchQuery);
        setPosts(postsData.results);
      } catch (err) {
        console.error('Не удалось загрузить посты:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadPosts();
  }, [layout, searchQuery]);

  if (isLoading) {
    return <p>Загрузка постов...</p>;
  }

  if (!isComplexLayout || searchQuery) {
    return (
      <SearchListWrapper>
        {posts.map((post) => (
          <PostLinkWrapper key={post.id} to={`/post/${post.id}`}>
            <PostCard post={post} variant="vertical" />
          </PostLinkWrapper>
        ))}
      </SearchListWrapper>
    );
  }

  // ---  сетка для широких экранов ---
  const isHorizontalLayout = layout === 'horizontal';
  const isTwoVerticalLayout = layout === 'two-vertical';

  if (isTwoVerticalLayout) {
    return (
      <PostsGridContainer $layout="two-vertical">
        {posts.slice(0, 6).map((post, index) => (
          <PostLinkWrapper
            key={post.id}
            to={`/post/${post.id}`}
            $area={`vertical${index + 1}`}
          >
            <PostCard post={post} variant="vertical" />
          </PostLinkWrapper>
        ))}
        {posts.slice(6, 12).map((post, index) => (
          <PostLinkWrapper
            key={post.id}
            to={`/post/${post.id}`}
            $area={`compact${index + 1}`}
          >
            <PostCard post={post} variant="compact" />
          </PostLinkWrapper>
        ))}
      </PostsGridContainer>
    );
  }

  if (isHorizontalLayout) {
    const defaultHorizontalPost = posts[0];
    const defaultVerticalPosts = posts.slice(1, 5);
    const defaultCompactPosts = posts.slice(5, 11);

    return (
      <PostsGridContainer $layout="horizontal">
        {defaultHorizontalPost && (
          <PostLinkWrapper
            to={`/post/${defaultHorizontalPost.id}`}
            $area="horizontal"
          >
            <PostCard post={defaultHorizontalPost} variant="horizontal" />
          </PostLinkWrapper>
        )}
        {defaultVerticalPosts.map((post, index) => (
          <PostLinkWrapper
            key={post.id}
            to={`/post/${post.id}`}
            $area={`vertical${index + 1}`}
          >
            <PostCard post={post} variant="vertical" />
          </PostLinkWrapper>
        ))}
        {defaultCompactPosts.map((post, index) => (
          <PostLinkWrapper
            key={post.id}
            to={`/post/${post.id}`}
            $area={`compact${index + 1}`}
          >
            <PostCard post={post} variant="compact" />
          </PostLinkWrapper>
        ))}
      </PostsGridContainer>
    );
  }

  return null;
};

export default PostList;

// --- Styled Components ---

const PostsGridContainer = styled.div<{
  $layout: 'horizontal' | 'two-vertical';
}>`
  display: grid;
  gap: 10px;
  background: ${({ theme }) => theme.background};
  margin-bottom: 20px;

  ${({ $layout }) =>
    $layout === 'horizontal'
      ? css`
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-areas:
            'horizontal horizontal compact1'
            'horizontal horizontal compact2'
            'vertical1 vertical2 compact3'
            'vertical1 vertical2 compact4'
            'vertical3 vertical4 compact5'
            'vertical3 vertical4 compact6';
        `
      : css`
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-areas:
            'vertical1 vertical2 compact1'
            'vertical1 vertical2 compact2'
            'vertical3 vertical4 compact3'
            'vertical3 vertical4 compact4'
            'vertical5 vertical6 compact5'
            'vertical5 vertical6 compact6';
        `}
`;

export const PostLinkWrapper = styled(Link)<{ $area?: string }>`
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
  cursor: pointer;
  ${({ $area }) => $area && `grid-area: ${$area};`}
`;

export const SearchListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  max-width: 800px;
  margin: 30px auto;
  padding: 0 20px;
`;
