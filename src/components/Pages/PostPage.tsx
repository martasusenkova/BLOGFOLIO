import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Components/Button';
import { IPost } from '../Components/PostCard';
import FormTemplate from './FormTemplate';
import { fetchPostById, fetchPosts, ApiResponse } from '../../Api/api';

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

const NAVIGATION_POST_LIMIT = 10;

const PostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<IPost | null>(null);
  const [allPostIDs, setAllPostIDs] = useState<number[]>([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      const currentId = Number(postId);

      if (!currentId || isNaN(currentId)) {
        setLoading(false);
        return setError('ID поста некорректен.');
      }

      try {
        const allPostsResponse = await fetchPosts(0, NAVIGATION_POST_LIMIT);

        const IDs = allPostsResponse.results.map((p) => p.id);

        setAllPostIDs(IDs);

        const index = IDs.findIndex((id) => id === currentId);
        setCurrentPostIndex(index >= 0 ? index + 1 : 0);

        const currentPost = await fetchPostById(currentId);
        setPost(currentPost);
      } catch (e) {
        setError('Ошибка при загрузке поста или пост не найден.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [postId]);

  const handlePostChange = (newIndex: number) => {
    const totalPosts = allPostIDs.length;

    if (newIndex >= 1 && newIndex <= totalPosts) {
      const newPostId = allPostIDs[newIndex - 1];
      navigate(`/post/${newPostId}`);
    }
  };

  if (loading) return <Center>Загрузка...</Center>;
  if (error) return <Center>{error}</Center>;
  if (!post) return <Center>Пост не найден</Center>;

  return (
    <FormTemplate
      title={post.title}
      showBackButton={true}
      currentPage={currentPostIndex}
      totalPages={allPostIDs.length}
      onPageChange={handlePostChange}
      showOnlyArrows={true}
    >
      <PageWrapper>
        {post.image && <HeroImage src={post.image} alt={post.title} />}
        <Content dangerouslySetInnerHTML={{ __html: post.text }} />
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
