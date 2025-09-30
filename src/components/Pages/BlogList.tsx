import React, { useState } from 'react';
import FormTemplate from './FormTemplate';
import { Tabs } from '../Components/Tabs';
import PostList from '../Components/PostList';

const BlogList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const tabsData = [
    { label: 'All', value: 'all' },
    { label: 'My favorites', value: 'my-favorites' },
    { label: 'Popular', value: 'popular', disabled: true },
  ];

  return (
    <FormTemplate
      title="Blog"
      showBackButton={false}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    >
      <Tabs tabs={tabsData} activeTab={activeTab} onTabChange={setActiveTab} />
      <PostList layout="two-vertical" />
    </FormTemplate>
  );
};

export default BlogList;
