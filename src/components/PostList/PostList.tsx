import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { PostCard, IPost } from '../PostCard';
import { fetchPosts } from '../../Api/api';

interface PostListProps {
  layout?: 'default' | 'two-vertical';
}

const PostList: React.FC<PostListProps> = ({ layout = 'default' }) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postsData = await fetchPosts();
        setPosts(postsData);
      } catch (err) {
        console.error('Не удалось загрузить посты:', err);
      }
    };
    loadPosts();
  }, []);

  // Макет "default"
  const defaultHorizontalPost = posts[0];
  const defaultVerticalPosts = posts.slice(1, 5);
  const defaultCompactPosts = posts.slice(5, 11);

  // Макет "two-vertical"
  const twoVerticalPosts = posts.slice(0, 2);
  const remainingVerticalPosts = posts.slice(2, 6);
  const compactPostsTwoVertical = posts.slice(6, 12);

  return (
    <PostsGridContainer $layout={layout}>
      {layout === 'default' && (
        <>
          {defaultHorizontalPost && (
            <PostWrapper $area="horizontal">
              <PostCard post={defaultHorizontalPost} variant="horizontal" />
            </PostWrapper>
          )}

          {defaultVerticalPosts.map((post, index) => (
            <PostWrapper key={post.id} $area={`vertical${index + 1}`}>
              <PostCard post={post} variant="vertical" />
            </PostWrapper>
          ))}

          {defaultCompactPosts.map((post, index) => (
            <PostWrapper key={post.id} $area={`compact${index + 1}`}>
              <PostCard post={post} variant="compact" />
            </PostWrapper>
          ))}
        </>
      )}

      {layout === 'two-vertical' && (
        <>
          {twoVerticalPosts.map((post, index) => (
            <PostWrapper key={post.id} $area={`vertical${index + 1}`}>
              <PostCard post={post} variant="vertical" />
            </PostWrapper>
          ))}

          {remainingVerticalPosts.map((post, index) => (
            <PostWrapper key={post.id} $area={`vertical${index + 3}`}>
              <PostCard post={post} variant="vertical" />
            </PostWrapper>
          ))}

          {compactPostsTwoVertical.map((post, index) => (
            <PostWrapper key={post.id} $area={`compact${index + 1}`}>
              <PostCard post={post} variant="compact" />
            </PostWrapper>
          ))}
        </>
      )}
    </PostsGridContainer>
  );
};

export default PostList;

// --- Styled Components ---

const PostsGridContainer = styled.div<{ $layout: 'default' | 'two-vertical' }>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  background: ${({ theme }) => theme.background};
  margin-bottom: 20px;

  ${({ $layout }) =>
    $layout === 'default'
      ? css`
          grid-template-areas:
            'horizontal horizontal compact1'
            'horizontal horizontal compact2'
            'vertical1 vertical2 compact3'
            'vertical1 vertical2 compact4'
            'vertical3 vertical4 compact5'
            'vertical3 vertical4 compact6';
        `
      : css`
          grid-template-areas:
            'vertical1 vertical2 compact1'
            'vertical1 vertical2 compact2'
            'vertical3 vertical4 compact3'
            'vertical3 vertical4 compact4'
            'vertical5 vertical6 compact5'
            'vertical5 vertical6 compact6';
        `}

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const PostWrapper = styled.div<{ $area: string }>`
  grid-area: ${({ $area }) => $area};
`;
