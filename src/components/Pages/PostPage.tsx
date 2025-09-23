import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../Components/Button';
import { IPost } from '../Components/PostCard';
import { fetchPostsFull } from '../../Api/api';
import FormTemplate from './FormTemplate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faBookmark,
} from '@fortawesome/free-regular-svg-icons';
import {
  ActionsLeft,
  ActionsRight,
  MirroredIcon,
} from '../Components/PostCard/PostCard';

const POSTS_PER_PAGE = 1;

const PostPage: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const fetchedPosts = await fetchPostsFull();
        if (fetchedPosts.length > 0) {
          setPosts(fetchedPosts);
        } else {
          setError('Посты не найдены');
        }
      } catch {
        setError('Ошибка при загрузке постов');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Center>Загрузка...</Center>;
  if (posts.length === 0) return <Center>Посты не найдены</Center>;

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const currentPost = posts[(currentPage - 1) * POSTS_PER_PAGE];

  return (
    <FormTemplate
      title={currentPost.title}
      showBackButton={false}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    >
      <PageWrapper>
        {currentPost.image && (
          <HeroImage src={currentPost.image} alt={currentPost.title} />
        )}
        <Content dangerouslySetInnerHTML={{ __html: currentPost.text }} />
        <ActionsContainer>
          <ActionsLeft>
            <Button
              variant="Icon"
              isLiked={true}
              onClick={() => console.log('Like clicked')}
              width="40px"
              height="40px"
            >
              <FontAwesomeIcon icon={faThumbsUp} />
            </Button>

            <Button
              variant="Icon"
              isDisliked={true}
              onClick={() => console.log('Dislike clicked')}
              width="40px"
              height="40px"
            >
              <MirroredIcon icon={faThumbsDown} />
            </Button>
          </ActionsLeft>
          <ActionsRight>
            <Button
              variant="IconWithText"
              onClick={() => console.log('Add to bookmark clicked')}
              height="40px"
            >
              Add to bookmarks
              <FontAwesomeIcon icon={faBookmark} />
            </Button>
          </ActionsRight>
        </ActionsContainer>
      </PageWrapper>
    </FormTemplate>
  );
};

export default PostPage;

// --- Styled Components ---
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
