import React, { useState, useEffect } from 'react';
import FormTemplate from './FormTemplate';
import { Tabs } from '../Components/Tabs';
import PostList from '../Components/PostList';
import { PostVariant } from '../Components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { loadPosts } from '../../core/store/PostsSlice';
import type { RootState, AppDispatch } from '../../core/store/store';

const BlogList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;
  const [cardVariant, setCardVariant] = useState<PostVariant>('horizontal');
  const dispatch = useDispatch<AppDispatch>();

  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(loadPosts({ offset: 0, limit: 12, groupId: 18 }));
  }, [dispatch]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);

    if (pageNumber > 1) {
      setCardVariant('two-vertical');
    } else {
      setCardVariant('horizontal');
    }
  };

  return (
    <FormTemplate
      title="Blog"
      showBackButton={false}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    >
      <Tabs
        tabs={[
          { label: 'All', value: 'all' },
          { label: 'My favorites', value: 'my-favorites' },
          { label: 'Popular', value: 'popular', disabled: true },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error}</p>}
      {!loading && !error && <PostList posts={posts} layout={cardVariant} />}
    </FormTemplate>
  );
};

export default BlogList;
