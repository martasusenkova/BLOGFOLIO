import React from 'react';
import FormTemplate from '../pages/FormTemplate';
import AddPostForm from '../Components/AddPostForm';

const AddPostPage: React.FC = () => {
  return (
    <FormTemplate title="Add post" showBackButton>
      <AddPostForm />
    </FormTemplate>
  );
};

export default AddPostPage;
