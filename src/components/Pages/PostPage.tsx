import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IPost } from '../PostCard';
import { fetchPostsFull } from '../../Api/api';
import FormTemplate from './FormTemplate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faBookmark,
} from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {
  ActionsLeft,
  ActionsRight,
  MirroredIcon,
  IconBtn,
} from '../PostCard/PostCard';

import { PageButton, PageNav } from './BlogList';
interface PostPageProps {
  onThemeToggle: () => void;
  currentTheme: 'light' | 'dark';
}
const PostPage: React.FC<PostPageProps> = ({ onThemeToggle, currentTheme }) => {
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const posts = await fetchPostsFull();
        if (posts.length > 0) {
          setPost(posts[0]);
        } else {
          setError('Посты не найдены');
        }
      } catch {
        setError('Ошибка при загрузке поста');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Center>Загрузка...</Center>;
  if (error) return <Center>{error}</Center>;
  if (!post) return <Center>Пост не найден</Center>;

  return (
    <FormTemplate
      onThemeToggle={onThemeToggle}
      currentTheme={currentTheme}
      title={post.title}
      showBackButton={false}
    >
      {' '}
      <PageWrapper>
        {post.image && <HeroImage src={post.image} alt={post.title} />}
        <Content dangerouslySetInnerHTML={{ __html: post.text }} />
        <ActionsContainer>
          <ActionsLeft>
            <FontAwesomeIcon icon={faThumbsUp} />
            <MirroredIcon icon={faThumbsDown} />
          </ActionsLeft>
          <ActionsRight>
            <IconBtn>
              {' '}
              Add to bookmarks
              <FontAwesomeIcon icon={faBookmark} />
            </IconBtn>
          </ActionsRight>
        </ActionsContainer>
        <PageNav>
          {' '}
          <PageButton>Back</PageButton>
          <PageButton>Next</PageButton>
        </PageNav>
        <StyledPageNav>
          <FontAwesomeIcon icon={faArrowLeft} />
          <FontAwesomeIcon icon={faArrowRight} />
        </StyledPageNav>
      </PageWrapper>
    </FormTemplate>
  );
};

export default PostPage;

const PageWrapper = styled.main`
  max-width: 850px;
  margin: 32px auto;
  padding: 0 20px;
  color: ${({ theme }) => theme.text};
`;

const Center = styled.div`
  padding: 40px;
  text-align: center;
`;

const HeroImage = styled.img`
  width: 100%;

  border-radius: 8px;
  margin-bottom: 20px;
`;

const Content = styled.article`
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
  font-size: 18px;
  line-height: 1.8;
  color: ${({ theme }) => theme.text};
  text-align: justify;
  padding: 0 34px;
  p {
    margin-bottom: 20px;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 0 34px;
`;
const StyledPageNav = styled(PageNav)`
  padding: 0;
  margin-top: 5px;
  width: 100%;
`;
