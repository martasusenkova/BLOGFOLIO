import React from 'react';
import FormTemplate from '../Pages/FormTemplate';
import AddPostForm from '../Components/AddPostForm';

const AddPostPage: React.FC = () => {
  return (
    <FormTemplate title="Add post" showBackButton>
      <AddPostForm />
    </FormTemplate>
  );
};

export default AddPostPage;
