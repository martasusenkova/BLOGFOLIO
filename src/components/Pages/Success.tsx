import React from 'react';
import FormTemplate from './FormTemplate';
import Button from '../Button';
import { ContentContainer } from './Template';

const Success: React.FC = () => {
  return (
    <FormTemplate title="Success" showBackButton={true}>
      <ContentContainer>
        Your email confirmed
        <Button variant="Primary" width="340px">
          Go Home
        </Button>
      </ContentContainer>
    </FormTemplate>
  );
};

export default Success;
