import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PostCard, IPost } from '../PostCard';
import { fetchPosts } from '../api';

const PostList = () => {
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

  const horizontalPost = posts[0];
  const verticalPosts = posts.slice(1, 5);
  const compactPosts = posts.slice(5, 11);

  return (
    <>
      <PostsGridContainer>
        {horizontalPost && (
          <HorizontalPostWrapper>
            <PostCard post={horizontalPost} variant="horizontal" />
          </HorizontalPostWrapper>
        )}

        {verticalPosts[0] && (
          <VerticalPostWrapper1>
            <PostCard post={verticalPosts[0]} variant="vertical" />
          </VerticalPostWrapper1>
        )}
        {verticalPosts[1] && (
          <VerticalPostWrapper2>
            <PostCard post={verticalPosts[1]} variant="vertical" />
          </VerticalPostWrapper2>
        )}
        {verticalPosts[2] && (
          <VerticalPostWrapper3>
            <PostCard post={verticalPosts[2]} variant="vertical" />
          </VerticalPostWrapper3>
        )}
        {verticalPosts[3] && (
          <VerticalPostWrapper4>
            <PostCard post={verticalPosts[3]} variant="vertical" />
          </VerticalPostWrapper4>
        )}

        {compactPosts[0] && (
          <CompactPostWrapper1>
            <PostCard post={compactPosts[0]} variant="compact" />
          </CompactPostWrapper1>
        )}
        {compactPosts[1] && (
          <CompactPostWrapper2>
            <PostCard post={compactPosts[1]} variant="compact" />
          </CompactPostWrapper2>
        )}
        {compactPosts[2] && (
          <CompactPostWrapper3>
            <PostCard post={compactPosts[2]} variant="compact" />
          </CompactPostWrapper3>
        )}
        {compactPosts[3] && (
          <CompactPostWrapper4>
            <PostCard post={compactPosts[3]} variant="compact" />
          </CompactPostWrapper4>
        )}
        {compactPosts[4] && (
          <CompactPostWrapper5>
            <PostCard post={compactPosts[4]} variant="compact" />
          </CompactPostWrapper5>
        )}
        {compactPosts[5] && (
          <CompactPostWrapper6>
            <PostCard post={compactPosts[5]} variant="compact" />
          </CompactPostWrapper6>
        )}
      </PostsGridContainer>
    </>
  );
};

export default PostList;
const PostsGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
    'horizontal horizontal compact1'
    'horizontal horizontal compact2'
    'vertical1 vertical2 compact3'
    'vertical1 vertical2 compact4'
    'vertical3 vertical4 compact5'
    'vertical3 vertical4 compact6';

  gap: 10px;
  padding: 40px 200px;
  background: #f0f0f0;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const HorizontalPostWrapper = styled.div`
  grid-area: horizontal;
`;

const VerticalPostWrapper1 = styled.div`
  grid-area: vertical1;
`;

const VerticalPostWrapper2 = styled.div`
  grid-area: vertical2;
`;

const VerticalPostWrapper3 = styled.div`
  grid-area: vertical3;
`;

const VerticalPostWrapper4 = styled.div`
  grid-area: vertical4;
`;

const CompactPostWrapper1 = styled.div`
  grid-area: compact1;
`;

const CompactPostWrapper2 = styled.div`
  grid-area: compact2;
`;

const CompactPostWrapper3 = styled.div`
  grid-area: compact3;
`;

const CompactPostWrapper4 = styled.div`
  grid-area: compact4;
`;

const CompactPostWrapper5 = styled.div`
  grid-area: compact5;
`;

const CompactPostWrapper6 = styled.div`
  grid-area: compact6;
`;
