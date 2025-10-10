import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import useWindowWidth from '../../../Hooks/useWindowWidth';
import { Link } from 'react-router-dom';
import { RootState } from '../../../core/store';

import {
  PostCardFavorite as PostCard,
  IPost,
  PostVariant,
} from '../../Components/PostCardFavorite';

interface PostListProps {
  layout: PostVariant;
  listType: 'all' | 'favorites';
}

const PostListRedux: React.FC<PostListProps> = ({ layout, listType }) => {
  const allPosts: IPost[] = useSelector((state: any) => state.posts.allPosts);
  const favoriteIds: number[] = useSelector(
    (state: RootState) => state.favorites.favoriteIds
  );

  const postsToShow =
    listType === 'favorites'
      ? allPosts.filter((post) => favoriteIds.includes(post.id))
      : allPosts;

  const isLoading = false;

  const width = useWindowWidth();
  const isComplexLayout = width >= 950;

  const isFavoritesList = listType === 'favorites';

  const currentLayout =
    isComplexLayout && isFavoritesList ? 'two-vertical' : layout;

  if (isLoading) {
    return <p>Загрузка постов...</p>;
  }

  if (isFavoritesList && postsToShow.length === 0) {
    return <p>У вас пока нет избранных постов.</p>;
  }

  if (!isComplexLayout) {
    const responsiveVariant = width < 768 ? 'compact' : 'vertical';

    return (
      <ResponsiveWrapper>
        {postsToShow.map((post) => (
          <PostLinkWrapper
            key={post.id}
            to={`/post/${post.id}`}
            onClick={(e) => {
              if (
                e.target instanceof Element &&
                (e.target.closest('button') || e.target.closest('svg'))
              ) {
                e.preventDefault();
              }
            }}
          >
            <PostCard post={post} variant={responsiveVariant} />
          </PostLinkWrapper>
        ))}
      </ResponsiveWrapper>
    );
  }

  const isHorizontalLayout = currentLayout === 'horizontal';
  const isTwoVerticalLayout = currentLayout === 'two-vertical';

  if (isTwoVerticalLayout) {
    return (
      <PostsGridContainer $layout="two-vertical">
        {postsToShow.slice(0, 6).map((post, index) => (
          <PostLinkWrapper
            key={post.id}
            to={`/post/${post.id}`}
            $area={`vertical${index + 1}`}
            onClick={(e) => {
              if (
                e.target instanceof Element &&
                (e.target.closest('button') || e.target.closest('svg'))
              ) {
                e.preventDefault();
              }
            }}
          >
            <PostCard post={post} variant="vertical" />
          </PostLinkWrapper>
        ))}
        {postsToShow.slice(6, 12).map((post, index) => (
          <PostLinkWrapper
            key={post.id}
            to={`/post/${post.id}`}
            $area={`compact${index + 1}`}
            onClick={(e) => {
              if (
                e.target instanceof Element &&
                (e.target.closest('button') || e.target.closest('svg'))
              ) {
                e.preventDefault();
              }
            }}
          >
            <PostCard post={post} variant="compact" />
          </PostLinkWrapper>
        ))}
      </PostsGridContainer>
    );
  }

  if (isHorizontalLayout) {
    const defaultHorizontalPost = postsToShow[0];
    const defaultVerticalPosts = postsToShow.slice(1, 5);
    const defaultCompactPosts = postsToShow.slice(5, 11);

    return (
      <PostsGridContainer $layout="horizontal">
        {/* Horizontal */}
        {defaultHorizontalPost && (
          <PostLinkWrapper
            to={`/post/${defaultHorizontalPost.id}`}
            $area="horizontal"
            onClick={(e) => {
              if (
                e.target instanceof Element &&
                (e.target.closest('button') || e.target.closest('svg'))
              ) {
                e.preventDefault();
              }
            }}
          >
            <PostCard post={defaultHorizontalPost} variant="horizontal" />
          </PostLinkWrapper>
        )}
        {/* Vertical posts */}
        {defaultVerticalPosts.map((post, index) => (
          <PostLinkWrapper
            key={post.id}
            to={`/post/${post.id}`}
            $area={`vertical${index + 1}`}
            onClick={(e) => {
              if (
                e.target instanceof Element &&
                (e.target.closest('button') || e.target.closest('svg'))
              ) {
                e.preventDefault();
              }
            }}
          >
            <PostCard post={post} variant="vertical" />
          </PostLinkWrapper>
        ))}
        {/* Compact posts */}
        {defaultCompactPosts.map((post, index) => (
          <PostLinkWrapper
            key={post.id}
            to={`/post/${post.id}`}
            $area={`compact${index + 1}`}
            onClick={(e) => {
              if (
                e.target instanceof Element &&
                (e.target.closest('button') || e.target.closest('svg'))
              ) {
                e.preventDefault();
              }
            }}
          >
            <PostCard post={post} variant="compact" />
          </PostLinkWrapper>
        ))}
      </PostsGridContainer>
    );
  }

  return null;
};

export default PostListRedux;

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

const ResponsiveWrapper = styled.div`
  display: grid;
  gap: 10px;
  margin-bottom: 20px;

  grid-template-columns: 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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
