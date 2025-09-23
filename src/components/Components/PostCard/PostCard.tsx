import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faBookmark,
} from '@fortawesome/free-regular-svg-icons';

export interface IPost {
  id: number;
  image: string;
  text: string;
  date: string;
  lesson_num: number;
  title: string;
  author: number;
  description: string;
}

interface PostCardProps {
  post: IPost;
  variant?:
    | 'horizontal'
    | 'vertical'
    | 'compact'
    | 'compact-reverse'
    | undefined;
  footer?: boolean;
}
const fallbackImageUrl = '/astronaut.jpg';

export const PostCard: FC<PostCardProps> = ({
  post,
  variant = 'horizontal',
  footer = true,
}) => {
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    setHasError(true);
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
            />{' '}
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
              <LikesWrapper>
                <FontAwesomeIcon icon={faThumbsUp} />
                <LikesCount>26</LikesCount>
              </LikesWrapper>{' '}
              <MirroredIcon icon={faThumbsDown} />
            </ActionsLeft>
            <ActionsRight>
              <IconBtn>
                {' '}
                <FontAwesomeIcon icon={faBookmark} />
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

export default PostCard;

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
    `
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: center;
    `}

  ${({ $variant }) =>
    $variant === 'vertical' &&
    `
      flex-direction: column;
    `}
  
  ${({ $variant }) =>
    $variant === 'compact' &&
    `
      flex-direction: row-reverse;
      justify-content: flex-start;
      padding: 8px 12px;
    `}
      
  ${({ $variant }) =>
    $variant === 'compact-reverse' &&
    `
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

      @media (max-width: 1200px) {
        width: 100%;
        height: 180px;
      }

      @media (max-width: 768px) {
        height: 140px;
      }

      @media (min-width: 1400px) {
        width: auto;
        height: auto;
        flex: 1;

        img {
          aspect-ratio: 16 / 9;
        }
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
`;

const LikesCount = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;
