import { FC, useState } from 'react';
import styled from 'styled-components';

interface IBurger {
  size?: number;
}

const Burger: FC<IBurger> = ({ size = 35 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBurger = () => setIsOpen(!isOpen);

  return (
    <BurgerWrapper style={{ width: size, height: size }} onClick={toggleBurger}>
      <Line $isOpen={isOpen} />
      <Line $isOpen={isOpen} />
      <Line $isOpen={isOpen} />
    </BurgerWrapper>
  );
};

const BurgerWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: rgb(14, 49, 176);
  border-radius: 4px;
`;

const Line = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  width: 40%;
  height: 1px;
  background-color: white;
  border-radius: 1px;
  transition: all 0.3s ease;

  &:nth-child(1) {
    transform: ${({ $isOpen }) =>
      $isOpen ? 'rotate(45deg)' : 'translateY(-6px)'};
  }
  &:nth-child(2) {
    opacity: ${({ $isOpen }) => ($isOpen ? 0 : 1)};
  }
  &:nth-child(3) {
    transform: ${({ $isOpen }) =>
      $isOpen ? 'rotate(-45deg)' : 'translateY(6px)'};
  }
`;

export default Burger;
