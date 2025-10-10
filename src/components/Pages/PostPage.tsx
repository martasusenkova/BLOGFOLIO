import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/store';
import { addLike, addDislike, IPost } from '../../core/PostsSlice';
import { toggleLike, toggleDislike } from '../../core/UserReactionsSlice';
import { toggleFavorite } from '../../core/FavouritesSlice';

import Button from '../Components/Button';
import FormTemplate from './FormTemplate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faBookmark as faBookmarkRegular,
} from '@fortawesome/free-regular-svg-icons';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';

import {
  ActionsLeft,
  ActionsRight,
  MirroredIcon,
} from '../Components/PostCard/PostCard';
const fallbackImageUrl = '/astronaut.jpg';

const PostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hasError, setHasError] = useState(false);

  const currentId = Number(postId);

  const allPosts = useSelector((state: RootState) => state.posts.allPosts);
  const post = useSelector((state: RootState) =>
    state.posts.allPosts.find((p) => p.id === currentId)
  );

  const likedIds: number[] = useSelector(
    (state: RootState) => state.reactions.likedIds
  );
  const dislikedIds: number[] = useSelector(
    (state: RootState) => state.reactions.dislikedIds
  );
  const favoriteIds: number[] = useSelector(
    (state: RootState) => state.favorites.favoriteIds
  );

  const isLiked = likedIds.includes(currentId);
  const isDisliked = dislikedIds.includes(currentId);
  const isFavorite = favoriteIds.includes(currentId);

  const allPostIDs = allPosts.map((p) => p.id);
  const currentIndex = allPostIDs.findIndex((id) => id === currentId);
  const currentPostIndex = currentIndex >= 0 ? currentIndex + 1 : 0;

  const handlePostChange = (newIndex: number) => {
    const totalPosts = allPostIDs.length;

    if (newIndex >= 1 && newIndex <= totalPosts) {
      const newPostId = allPostIDs[newIndex - 1];
      navigate(`/post/${newPostId}`);
    }
  };

  const handleImageError = () => {
    setHasError(true);
  };

  const handleLike = useCallback(() => {
    dispatch(toggleLike(currentId));

    if (!isLiked) {
      dispatch(addLike(currentId));
    }
  }, [dispatch, currentId, isLiked]);

  const handleDislike = useCallback(() => {
    dispatch(toggleDislike(currentId));

    if (!isDisliked) {
      dispatch(addDislike(currentId));
    }
  }, [dispatch, currentId, isDisliked]);

  const handleToggleFavorite = useCallback(() => {
    dispatch(toggleFavorite(currentId));
  }, [dispatch, currentId]);

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
        {post.image && (
          <HeroImage
            src={hasError ? fallbackImageUrl : post.image}
            alt={post.title}
            onError={handleImageError}
          />
        )}
        <Content
          dangerouslySetInnerHTML={{ __html: post.description || post.text }}
        />

        <ActionsContainer>
          <ActionsLeft>
            {/* Контейнер для Лайка */}
            <ReactionButtonWrapper>
              <Button
                variant="Icon"
                onClick={handleLike}
                width="40px"
                height="40px"
                style={{ color: isLiked ? '#007bff' : 'inherit' }}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
              </Button>
              <LikesCount>{post.likes}</LikesCount>
            </ReactionButtonWrapper>

            {/* Контейнер для Дизлайка */}
            <ReactionButtonWrapper>
              <Button
                variant="Icon"
                onClick={handleDislike}
                width="40px"
                height="40px"
                style={{ color: isDisliked ? '#dc3545' : 'inherit' }}
              >
                <MirroredIcon icon={faThumbsDown} />
              </Button>
              <LikesCount>{post.dislikes}</LikesCount>
            </ReactionButtonWrapper>
          </ActionsLeft>
          <ActionsRight>
            {/* Кнопка Bookmark */}
            <Button
              variant="IconWithText"
              onClick={handleToggleFavorite}
              height="40px"
              style={{ color: isFavorite ? 'blue' : 'inherit' }}
            >
              {isFavorite ? 'Remove from bookmarks' : 'Add to bookmarks'}
              <FontAwesomeIcon
                icon={isFavorite ? faBookmarkSolid : faBookmarkRegular}
              />
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

const ReactionButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LikesCount = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import Button from '../Components/Button';
// import { IPost } from '../Components/PostCard';
// import FormTemplate from './FormTemplate';
// import { fetchPostById, fetchPosts, ApiResponse } from '../../Api/api';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faThumbsUp,
//   faThumbsDown,
//   faBookmark,
// } from '@fortawesome/free-regular-svg-icons';
// import {
//   ActionsLeft,
//   ActionsRight,
//   MirroredIcon,
// } from '../Components/PostCard/PostCard';

// const NAVIGATION_POST_LIMIT = 10;

// const PostPage: React.FC = () => {
//   const { postId } = useParams<{ postId: string }>();
//   const navigate = useNavigate();

//   const [post, setPost] = useState<IPost | null>(null);
//   const [allPostIDs, setAllPostIDs] = useState<number[]>([]);
//   const [currentPostIndex, setCurrentPostIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       setError(null);

//       const currentId = Number(postId);

//       if (!currentId || isNaN(currentId)) {
//         setLoading(false);
//         return setError('ID поста некорректен.');
//       }

//       try {
//         const allPostsResponse = await fetchPosts(0, NAVIGATION_POST_LIMIT);

//         const IDs = allPostsResponse.results.map((p) => p.id);

//         setAllPostIDs(IDs);

//         const index = IDs.findIndex((id) => id === currentId);
//         setCurrentPostIndex(index >= 0 ? index + 1 : 0);

//         const currentPost = await fetchPostById(currentId);
//         setPost(currentPost);
//       } catch (e) {
//         setError('Ошибка при загрузке поста или пост не найден.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, [postId]);

//   const handlePostChange = (newIndex: number) => {
//     const totalPosts = allPostIDs.length;

//     if (newIndex >= 1 && newIndex <= totalPosts) {
//       const newPostId = allPostIDs[newIndex - 1];
//       navigate(`/post/${newPostId}`);
//     }
//   };

//   if (loading) return <Center>Загрузка...</Center>;
//   if (error) return <Center>{error}</Center>;
//   if (!post) return <Center>Пост не найден</Center>;

//   return (
//     <FormTemplate
//       title={post.title}
//       showBackButton={true}
//       currentPage={currentPostIndex}
//       totalPages={allPostIDs.length}
//       onPageChange={handlePostChange}
//       showOnlyArrows={true}
//     >
//       <PageWrapper>
//         {post.image && <HeroImage src={post.image} alt={post.title} />}
//         <Content dangerouslySetInnerHTML={{ __html: post.text }} />
//         <ActionsContainer>
//           <ActionsLeft>
//             <Button
//               variant="Icon"
//               isLiked={true}
//               onClick={() => console.log('Like clicked')}
//               width="40px"
//               height="40px"
//             >
//               <FontAwesomeIcon icon={faThumbsUp} />
//             </Button>

//             <Button
//               variant="Icon"
//               isDisliked={true}
//               onClick={() => console.log('Dislike clicked')}
//               width="40px"
//               height="40px"
//             >
//               <MirroredIcon icon={faThumbsDown} />
//             </Button>
//           </ActionsLeft>
//           <ActionsRight>
//             <Button
//               variant="IconWithText"
//               onClick={() => console.log('Add to bookmark clicked')}
//               height="40px"
//             >
//               Add to bookmarks
//               <FontAwesomeIcon icon={faBookmark} />
//             </Button>
//           </ActionsRight>
//         </ActionsContainer>
//       </PageWrapper>
//     </FormTemplate>
//   );
// };

// export default PostPage;

// // --- Styled Components ---

// const PageWrapper = styled.main`
//   max-width: 850px;
//   margin: 32px auto;
//   padding: 0 20px;
//   color: ${({ theme }) => theme.text};
// `;

// const Center = styled.div`
//   padding: 40px;
//   text-align: center;
// `;

// const HeroImage = styled.img`
//   width: 100%;
//   border-radius: 8px;
//   margin-bottom: 20px;
// `;

// const Content = styled.article`
//   display: flex;
//   flex-direction: column;
//   font-family: Arial, sans-serif;
//   font-size: 18px;
//   line-height: 1.8;
//   color: ${({ theme }) => theme.text};
//   text-align: justify;
//   padding: 0 34px;
//   p {
//     margin-bottom: 20px;
//   }
// `;

// const ActionsContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-top: 20px;
//   padding: 0 34px;
// `;
