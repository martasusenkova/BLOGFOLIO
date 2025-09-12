import React from 'react';
import './App.css';
import User from './components/User';
import Title from './components/Title';
import Button from './components/Button';
import Burger from './components/Burger';
function App() {
  return (
    <>
      <User username="Marta Susenkova" />
      <Title text="Sign In" />
      <Burger></Burger>
      <Button variant="Primary" text="Primary"></Button>
      <Button variant="Secondary" text="Secondary"></Button>
      <Button variant="Secondary2" text="Secondary 2"></Button>{' '}
    </>
  );
}

export default App;
