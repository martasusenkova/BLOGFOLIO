import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { setPreviewImage } from '../core/PostPreview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const PostPreviewPopup: React.FC = () => {
  const dispatch = useDispatch();
  const imageUrl = useSelector(
    (state: RootState) => state.postPreview.imageUrl
  );

  const handleClose = () => dispatch(setPreviewImage(null));

  if (!imageUrl) return null;
  return (
    <Overlay onClick={handleClose}>
      <Popup onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>

        <ImageContainer>
          <Image src={imageUrl} alt="Preview" />
        </ImageContainer>
      </Popup>
    </Overlay>
  );
};

export default PostPreviewPopup;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Popup = styled.div`
  position: relative;
  background-color: white;
  padding: 40px;
  border-radius: 4px;
  width: 600px;
  height: 400px;
  box-sizing: border-box;

  border: 1px solid #a9a9a9;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const Image = styled.img`
  width: 260px;
  height: 260px;
  object-fit: cover;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  color: #5f5f5f;
  cursor: pointer;
  z-index: 10;
  padding: 5px;

  &:hover {
    color: #000;
  }
`;
