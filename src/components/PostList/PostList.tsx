import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { PostCard, IPost } from '../PostCard';
import { fetchPosts } from '../../Api/api';
import useWindowWidth from '../../Hooks/UseWindowWidth';

interface PostListProps {
  layout?: 'default' | 'two-vertical';
}

const PostList: React.FC<PostListProps> = ({ layout = 'default' }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const width = useWindowWidth();

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

  let postsToRender = [];
  let cardVariant:
    | 'vertical'
    | 'compact'
    | 'horizontal'
    | 'compact-reverse'
    | undefined;

  if (width < 768) {
    postsToRender = posts.slice(0, 6);
    cardVariant = 'compact';
  } else if (width < 950) {
    postsToRender = posts.slice(0, 12);
    cardVariant = 'vertical';
  } else {
    const defaultHorizontalPost = posts[0];
    const defaultVerticalPosts = posts.slice(1, 5);
    const defaultCompactPosts = posts.slice(5, 11);

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
            {posts.slice(0, 6).map((post, index) => (
              <PostWrapper key={post.id} $area={`vertical${index + 1}`}>
                <PostCard post={post} variant="vertical" />
              </PostWrapper>
            ))}
            {posts.slice(6, 12).map((post, index) => (
              <PostWrapper key={post.id} $area={`compact${index + 1}`}>
                <PostCard post={post} variant="compact" />
              </PostWrapper>
            ))}
          </>
        )}
      </PostsGridContainer>
    );
  }

  return (
    <ResponsiveWrapper>
      {postsToRender.map((post) => (
        <PostCard key={post.id} post={post} variant={cardVariant} />
      ))}
    </ResponsiveWrapper>
  );
};

export default PostList;

// --- Styled Components ---

const PostsGridContainer = styled.div<{ $layout: 'default' | 'two-vertical' }>`
  display: grid;
  gap: 10px;
  background: ${({ theme }) => theme.background};
  margin-bottom: 20px;

  ${({ $layout }) =>
    $layout === 'default'
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

const PostWrapper = styled.div<{ $area: string }>`
  grid-area: ${({ $area }) => $area};
`;

const ResponsiveWrapper = styled.div`
  display: grid;
  gap: 10px;
  margin-bottom: 20px;

  grid-template-columns: 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
