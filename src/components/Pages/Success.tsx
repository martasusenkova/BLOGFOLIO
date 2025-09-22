import React from 'react';
import FormTemplate from './FormTemplate';
import Button from '../Button';
import { ContentContainer } from './Template';

const Success: React.FC = () => {
  return (
    <FormTemplate title="Success" showBackButton={true}>
      <ContentContainer>
        Your email confirmed
        <Button variant="Primary" text="Go Home" width="340px"></Button>
      </ContentContainer>
    </FormTemplate>
  );
};

export default Success;
