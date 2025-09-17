import styled from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    text: string;
    primary: string;
    cardBorder: string;
    error: string;
    inputBorder: string;
    inputBackground: string;
    disabledBackground: string;
    disabledText: string;
    disabledBorder: string;
    inputGridBackground: string;
  }
}

export const lightTheme = {
  background: '#efefef',
  text: '#464646',
  primary: '#007bff',
  cardBorder: '#ada8a8',
  error: '#ff0000',
  inputBorder: '#a8a8a8',
  inputBackground: '#fff',
  disabledBackground: '#f2f2f2',
  disabledText: '#7f7f7f',
  disabledBorder: '#d3d3d3',
  inputGridBackground: 'rgb(224, 224, 224)',
};

export const darkTheme = {
  background: '#2c2c2c',
  text: '#ffffff',
  primary: '#ff6600',
  cardBorder: '#efefef',
  error: '#ff5c5c',
  inputBorder: '#d0d0d0',
  inputBackground: '#2a2a2a',
  disabledBackground: '#1e1e1e',
  disabledText: '#777',
  disabledBorder: '#4a4a4a',
  inputGridBackground: '#333333',
};

const Toggle = styled.button<{ $active: boolean }>`
  width: 60px;
  height: 30px;
  background: ${({ $active }) => ($active ? '#333' : '#ddd')};
  border-radius: 30px;
  position: relative;
  border: none;
  cursor: pointer;
  padding: 0;

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${({ $active }) => ($active ? '32px' : '3px')};
    width: 24px;
    height: 24px;
    background: white;
    border-radius: 50%;
    transition: left 0.3s ease;
  }
`;

interface Props {
  isDark: boolean;
  toggle: () => void;
}

const ThemeToggle: React.FC<Props> = ({ isDark, toggle }) => {
  return <Toggle $active={isDark} onClick={toggle} />;
};

export default ThemeToggle;
