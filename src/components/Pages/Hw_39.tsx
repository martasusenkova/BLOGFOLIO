import React, { useState } from 'react';
import User from '../User';
import Button from '../Button';
import { Input, InputContainer, InputGrid } from '../Input';
import Textarea from '../Textarea';
import { Tabs } from '../Tabs';
import FormTemplate from './FormTemplate';

interface HW39Props {
  onThemeToggle: () => void;
  currentTheme: 'light' | 'dark';
}
const Hw_39: React.FC<HW39Props> = ({ onThemeToggle, currentTheme }) => {
  const [defaultText, setDefaultText] = useState('');
  const [activeText, setActiveText] = useState('Text');
  const [disabledText, setDisabledText] = useState('Text');
  const [errorText, setErrorText] = useState('Text');
  const [textareaValue, setTextareaValue] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const tabsData = [
    { label: 'All', value: 'all' },
    { label: 'My favorites', value: 'my-favorites' },
    { label: 'Popular', value: 'popular', disabled: true },
  ];
  return (
    <>
      <FormTemplate
        onThemeToggle={onThemeToggle}
        currentTheme={currentTheme}
        title="HW 39"
        showBackButton={false}
      >
        <Tabs
          tabs={tabsData}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <User username="Marta Susenkova" />
        <Button variant="Primary" text="Primary"></Button>
        <Button variant="Secondary" text="Secondary"></Button>
        <Button variant="Secondary2" text="Secondary 2"></Button>{' '}
        <InputGrid>
          <InputContainer>
            <Input
              type="text"
              label="Title"
              value={defaultText}
              onChange={setDefaultText}
              placeholder="Placeholder"
            />
            DEFAULT
          </InputContainer>
          <InputContainer>
            <Input
              type="email"
              label="Title"
              value={defaultText}
              onChange={setDefaultText}
              placeholder="Placeholder"
            />
            FOCUS
          </InputContainer>
          <InputContainer>
            <Input label="Title" value={activeText} onChange={setActiveText} />
            ACTIVE{' '}
          </InputContainer>
          <InputContainer>
            <Input
              type="password"
              label="Title"
              value={disabledText}
              onChange={setDisabledText}
              disabled={true}
            />
            DISABLED{' '}
          </InputContainer>
          <InputContainer>
            <Input
              label="Title"
              value={errorText}
              onChange={setErrorText}
              error={true}
              errorText="Error text"
            />
            ERROR{' '}
          </InputContainer>

          <Textarea
            label="Text"
            value={textareaValue}
            onChange={setTextareaValue}
          />
        </InputGrid>
      </FormTemplate>
    </>
  );
};

export default Hw_39;
