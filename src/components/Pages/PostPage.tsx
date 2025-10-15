import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faBookmark,
} from '@fortawesome/free-regular-svg-icons';

import { useAppDispatch, useAppSelector } from '../../core/store/reduxHooks';
import { loadPostById, loadPosts } from '../../core/store/PostsSlice';
import FormTemplate from './FormTemplate';
import Button from '../Components/Button';
import {
  ActionsLeft,
  ActionsRight,
  MirroredIcon,
} from '../Components/PostCard/PostCard';

const NAVIGATION_POST_LIMIT = 12;

const PostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    selectedPost: post,
    posts,
    loading,
    error,
  } = useAppSelector((state) => state.posts);

  useEffect(() => {
    if (postId) {
      dispatch(loadPostById(Number(postId)));
      dispatch(loadPosts({ offset: 0, limit: NAVIGATION_POST_LIMIT }));
    }
  }, [postId, dispatch]);

  const handlePostChange = (newIndex: number) => {
    const ids = posts.map((p) => p.id);
    const newPostId = ids[newIndex];
    if (newPostId) navigate(`/post/${newPostId}`);
  };

  if (loading) return <Center>Загрузка...</Center>;
  if (error) return <Center>{error}</Center>;
  if (!post) return <Center>Пост не найден</Center>;

  return (
    <FormTemplate
      title={post.title}
      showBackButton={true}
      currentPage={posts.findIndex((p) => p.id === post.id) + 1}
      totalPages={posts.length}
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
              onClick={() => console.log('Like')}
              width="40px"
              height="40px"
            >
              <FontAwesomeIcon icon={faThumbsUp} />
            </Button>
            <Button
              variant="Icon"
              isDisliked={true}
              onClick={() => console.log('Dislike')}
              width="40px"
              height="40px"
            >
              <MirroredIcon icon={faThumbsDown} />
            </Button>
          </ActionsLeft>
          <ActionsRight>
            <Button
              variant="IconWithText"
              onClick={() => console.log('Bookmark')}
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
  font-size: 18px;
  line-height: 1.8;
  text-align: justify;
  padding: 0 34px;
`;
const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 34px;
`;
