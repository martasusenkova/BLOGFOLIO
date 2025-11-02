import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface Props {
  onFileChange: (file: File | null) => void;
  initialPreview?: string | null;
  maxFileSizeMB?: number;
  accept?: string;
  label?: string;
}

const ImageUploader: React.FC<Props> = ({
  onFileChange,
  initialPreview = null,
  maxFileSizeMB = 5,
  accept = 'image/*',
  label = 'Image',
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialPreview);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(initialPreview);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file, initialPreview]);

  const validateFile = (f: File) => {
    if (!f.type.startsWith('image/')) return 'Нужен файл изображения';
    if (f.size > maxFileSizeMB * 1024 * 1024)
      return `Файл должен быть меньше ${maxFileSizeMB} MB`;
    return null;
  };

  const handleFile = (f: File | null) => {
    setError(null);
    if (!f) {
      setFile(null);
      onFileChange(null);
      return;
    }
    const err = validateFile(f);
    if (err) {
      setError(err);
      return;
    }
    setFile(f);
    onFileChange(f);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    handleFile(f);
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <Wrapper>
      <TopRow>
        <Label>{label}</Label>
      </TopRow>

      <PreviewRow>
        {preview ? (
          <PreviewImg src={preview} alt="preview" />
        ) : (
          <NoPreview>Нет изображения</NoPreview>
        )}
        <Controls>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={onInputChange}
            id="image-input"
            style={{ display: 'none' }}
          />
          <Button type="button" onClick={() => inputRef.current?.click()}>
            {preview ? 'Заменить' : 'Загрузить'}
          </Button>
          {preview && (
            <Button type="button" variant="secondary" onClick={removeFile}>
              Удалить
            </Button>
          )}
        </Controls>
      </PreviewRow>

      {error && <Error>{error}</Error>}
      <Hint>Поддерживаемые форматы: jpg, png. Макс {maxFileSizeMB} MB.</Hint>
    </Wrapper>
  );
};

export default ImageUploader;

const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  box-sizing: border-box;
  margin: 8px 0 0 0;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const PreviewRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const PreviewImg = styled.img`
  width: 220px;
  height: 140px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.cardBorder};
`;

const NoPreview = styled.div`
  width: 220px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.disabledText};
  border-radius: 6px;
  border: 1px dashed ${({ theme }) => theme.cardBorder};
`;

const Controls = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 8px 12px;
  background: ${({ variant, theme }) =>
    variant === 'secondary' ? theme.inputBackground : theme.primary};
  color: ${({ variant, theme }) =>
    variant === 'secondary' ? theme.text : '#fff'};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    opacity: 0.95;
  }
`;

const Error = styled.div`
  margin-top: 8px;
  color: #d9534f;
  font-size: 13px;
`;

const Hint = styled.div`
  margin-top: 6px;
  color: ${({ theme }) => theme.disabledText};
  font-size: 12px;
`;
