import React, { useState } from 'react';
import FormTemplate from './FormTemplate';
import { Tabs } from '../Components/Tabs';
import PostList from '../Components/PostList';
import { PostVariant } from '../Components/PostCard';

const BlogList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;

  const [cardVariant, setCardVariant] = useState<PostVariant>('horizontal');

  const tabsData = [
    { label: 'All', value: 'all' },
    { label: 'My favorites', value: 'my-favorites' },
    { label: 'Popular', value: 'popular', disabled: true },
  ];

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
      <Tabs tabs={tabsData} activeTab={activeTab} onTabChange={setActiveTab} />

      <PostList layout={cardVariant} />
    </FormTemplate>
  );
};

export default BlogList;
