import React, { FC, useState } from 'react';
import styled from 'styled-components';
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
  variant?: 'horizontal' | 'vertical' | 'compact';
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
  margin: 0 auto;
`;

const CardContainer = styled.div<{ $variant: string }>`
  display: flex;
  flex-direction: row-reverse;
  padding: 8px;
  align-items: center;
  justify-content: space-between;
  align-items: flex-start;

  flex: 1;

  ${({ $variant }) =>
    $variant === 'vertical' &&
    `
      flex-direction: column;
      align-items: flex-start;
    `}
  ${({ $variant }) =>
    $variant === 'compact' &&
    `
      align-items: flex-start;
      padding: 8px 12px;
    `}
`;

const ImageWrapper = styled.div<{ $variant: string }>`
  img {
    border-radius: 3px;
    object-fit: cover;
    ${({ $variant }) =>
      $variant === 'horizontal' &&
      `
        width: 230px;
        height: 230px;
      `}
    ${({ $variant }) =>
      $variant === 'vertical' &&
      `
        width: 330px;
        height: 200px;
        margin-bottom: 12px;
      `}
    ${({ $variant }) =>
      $variant === 'compact' &&
      `
        width: 80px;
        height: 80px;
        margin-right: 12px;
        margin-left: 16px;
      `}
  }
`;

const Content = styled.div<{ $variant: string }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 450px;
`;

const DateText = styled.span`
  font-size: 12px;
  color: gray;
  margin-bottom: 6px;
`;

const Title = styled.h3<{ $variant: string }>`
  font-size: 24px;
  line-height: 160%;
  margin: 0 0 8px 0;
  font-weight: 900;

  ${({ $variant }) =>
    $variant === 'vertical' &&
    `
      font-size: 16px; 
    `}

  ${({ $variant }) =>
    $variant === 'compact' &&
    `
      font-size: 14px; 
    `}
`;
const Text = styled.p`
  font-size: 16px;
  line-height: 150%;
  color: #444;
  margin-bottom: 12px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #d1d1d1;
  margin: 10px 5px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
`;

const ActionsLeft = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionsRight = styled.div`
  display: flex;
  gap: 12px;
`;
const MirroredIcon = styled(FontAwesomeIcon)`
  transform: scaleX(-1);
`;
const IconBtn = styled.button`
  background: none;
  display: flex;
  flex-direction: row-reverse;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 900;
  color: #0b0b0b;

  &:hover {
    color: black;
  }
`;
const LikesWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LikesCount = styled.span`
  font-size: 14px;
  color: #000000;
`;
