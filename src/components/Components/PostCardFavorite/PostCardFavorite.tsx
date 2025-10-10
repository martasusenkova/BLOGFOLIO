import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { setPreviewImage } from '../../../core/PostPreview';
import { addLike, addDislike, IPost } from '../../../core/PostsSlice';
import { toggleLike, toggleDislike } from '../../../core/UserReactionsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faBookmark as faBookmarkRegular,
} from '@fortawesome/free-regular-svg-icons';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { toggleFavorite } from '../../../core/FavouritesSlice';
import { RootState } from '../../../core/store';

export type PostVariant =
  | 'horizontal'
  | 'vertical'
  | 'compact'
  | 'compact-reverse'
  | 'two-vertical';

interface PostCardProps {
  post: IPost;
  variant?: PostVariant | undefined;
  footer?: boolean;
}
const fallbackImageUrl = '/astronaut.jpg';

export const PostCardFavorite: FC<PostCardProps> = ({
  post,
  variant = 'horizontal',
  footer = true,
}) => {
  const [hasError, setHasError] = useState(false);
  const dispatch = useDispatch();

  const favoriteIds: number[] = useSelector(
    (state: RootState) => state.favorites.favoriteIds
  );

  const likedIds: number[] = useSelector(
    (state: RootState) => state.reactions.likedIds
  );
  const dislikedIds: number[] = useSelector(
    (state: RootState) => state.reactions.dislikedIds
  );

  const isFavorite = favoriteIds.includes(post.id);
  const isLiked = likedIds.includes(post.id);
  const isDisliked = dislikedIds.includes(post.id);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(toggleLike(post.id));

    if (!isLiked) {
      dispatch(addLike(post.id));
    }
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(toggleDislike(post.id));

    if (!isDisliked) {
      dispatch(addDislike(post.id));
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(post.id));
  };

  const handleImageError = () => {
    setHasError(true);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setPreviewImage(post.image));
  };

  return (
    <Wrapper>
      <CardContainer $variant={variant}>
        {post.image && (
          <ImageWrapper $variant={variant}>
            <img
              src={hasError ? fallbackImageUrl : post.image}
              alt={post.title}
              onError={handleImageError}
              style={{ cursor: 'pointer' }}
              onClick={handleImageClick}
            />
          </ImageWrapper>
        )}
        <Content $variant={variant}>
          <DateText>{post.date}</DateText>
          <Title $variant={variant}>{post.title}</Title>{' '}
          {variant === 'horizontal' && <Text>{post.text}</Text>}
        </Content>
      </CardContainer>

      {footer && (
        <>
          <Footer>
            <ActionsLeft>
              <LikesWrapper onClick={handleLike}>
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  style={{
                    cursor: 'pointer',
                    color: isLiked ? '#007bff' : 'inherit',
                  }}
                />
                <LikesCount>{post.likes}</LikesCount>
              </LikesWrapper>{' '}
              <LikesWrapper onClick={handleDislike}>
                <MirroredIcon
                  icon={faThumbsDown}
                  style={{
                    cursor: 'pointer',
                    color: isDisliked ? '#dc3545' : 'inherit',
                  }}
                />
                <LikesCount>{post.dislikes}</LikesCount>
              </LikesWrapper>
            </ActionsLeft>
            <ActionsRight>
              <IconBtn onClick={handleToggleFavorite}>
                <FontAwesomeIcon
                  icon={isFavorite ? faBookmarkSolid : faBookmarkRegular}
                  style={{ color: isFavorite ? 'blue' : 'inherit' }}
                />
              </IconBtn>
              <IconBtn>⋯</IconBtn>
            </ActionsRight>
          </Footer>
          <Divider />
        </>
      )}
    </Wrapper>
  );
};

export default PostCardFavorite;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  width: 100%;
  margin: 0 auto;
`;

export const CardContainer = styled.div<{ $variant: string }>`
  display: flex;
  padding: 8px;
  align-items: flex-start;
  flex: 1;

  ${({ $variant }) =>
    $variant === 'horizontal' &&
    css`
      flex-direction: row-reverse;
      justify-content: space-between;

      @media (max-width: 1124px) {
        flex-direction: column;
        align-items: flex-start;
      }
    `}

  ${({ $variant }) =>
    $variant === 'vertical' &&
    css`
      flex-direction: column;
    `}
  
  ${({ $variant }) =>
    $variant === 'compact' &&
    css`
      flex-direction: row-reverse;
      justify-content: flex-start;
      padding: 8px 12px;
    `}
      
  ${({ $variant }) =>
    $variant === 'compact-reverse' &&
    css`
      flex-direction: row;
      justify-content: flex-start;
    `}
`;

const ImageWrapper = styled.div<{ $variant: string }>`
  img {
    border-radius: 3px;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  ${({ $variant }) =>
    $variant === 'horizontal' &&
    css`
      width: 230px;
      height: 230px;
      margin-left: 16px;

      @media (max-width: 1200px) {
        width: 200px;
        height: 200px;
      }

      @media (max-width: 1124px) {
        width: 100%;
        height: 180px;
        margin-left: 0;
        margin-bottom: 12px;
      }

      @media (max-width: 768px) {
        height: 140px;
      }

      img {
        aspect-ratio: 16 / 9;
      }
    `}

  ${({ $variant }) =>
    $variant === 'vertical' &&
    css`
      width: 330px;
      height: 200px;
      margin-bottom: 12px;

      @media (max-width: 1200px) {
        width: 100%;
        height: 160px;
      }

      @media (max-width: 768px) {
        height: 120px;
      }

      @media (min-width: 1400px) {
        width: 100%;
        height: auto;

        img {
          aspect-ratio: 1.65 / 1;
        }
      }
    `}

  ${({ $variant }) =>
    ($variant === 'compact' || $variant === 'compact-reverse') &&
    css`
      width: 80px;
      height: 80px;
      margin-right: 12px;
      margin-left: 16px;

      @media (max-width: 768px) {
        margin-right: 8px;
      }

      @media (max-width: 480px) {
        width: 60px;
        height: 60px;
      }
    `}
`;

const Content = styled.div<{ $variant: string }>`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const DateText = styled.span`
  font-size: 12px;
  color: gray;
  margin-bottom: 6px;
`;

const Title = styled.h3<{ $variant: string }>`
  font-size: 20px;
  line-height: 160%;
  margin: 0 0 8px 0;
  font-weight: 900;

  ${({ $variant }) =>
    $variant === 'horizontal' &&
    css`
      @media (max-width: 1024px) {
        font-size: 20px;
      }
      @media (max-width: 768px) {
        font-size: 18px;
      }
    `}

  ${({ $variant }) =>
    $variant === 'vertical' &&
    css`
      font-size: 16px;
      @media (max-width: 1024px) {
        font-size: 14px;
      }
    `}

  ${({ $variant }) =>
    ($variant === 'compact' || $variant === 'compact-reverse') &&
    css`
      font-size: 14px;

      @media (max-width: 1200px) {
        font-size: 11px;
      }
    `}
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 150%;
  color: ${({ theme }) => theme.text};
  margin-bottom: 12px;

  @media (max-width: 1024px) {
    font-size: 14px;
  }
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.cardBorder};
  margin: 10px 5px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
`;

export const ActionsLeft = styled.div`
  display: flex;
  gap: 12px;
`;

export const ActionsRight = styled.div`
  display: flex;
  gap: 12px;
`;
export const MirroredIcon = styled(FontAwesomeIcon)`
  transform: scaleX(-1);
`;
export const IconBtn = styled.button`
  background: none;
  display: flex;
  flex-direction: row-reverse;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 900;
  color: ${({ theme }) => theme.text};

  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;
const LikesWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const LikesCount = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;
