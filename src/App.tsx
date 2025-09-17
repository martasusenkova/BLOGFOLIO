import React, { useState } from 'react';
import User from './components/User';
import Title from './components/Title';
import Button from './components/Button';
import BurgerMenu from './components/BurgerMenu';
import { Input, InputContainer, InputGrid } from './components/Input';
import Textarea from './components/Textarea';
import { Tabs } from './components/Tabs';
import PostList from './components/PostList';

function App() {
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
      <Tabs tabs={tabsData} activeTab={activeTab} onTabChange={setActiveTab} />
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
      <User username="Marta Susenkova" />
      <Title text="Sign In" />
      <BurgerMenu></BurgerMenu>
      <Button variant="Primary" text="Primary"></Button>
      <Button variant="Secondary" text="Secondary"></Button>
      <Button variant="Secondary2" text="Secondary 2"></Button>
      <PostList />
    </>
  );
}

export default App;
