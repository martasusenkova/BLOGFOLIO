import React, { useState } from 'react';
import styled from 'styled-components';
import ImageUploader from '../ImagesUploader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'https://studapi.teachmeskills.by/';

const AddPostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [lessonNum, setLessonNum] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const access = localStorage.getItem('access') || '';

  const validate = () => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = 'Обязательное поле';
    if (lessonNum === '' || isNaN(Number(lessonNum)))
      e.lesson_num = 'Номер урока — число';
    if (!text.trim()) e.text = 'Обязательное поле';
    if (!imageFile) e.image = 'Загрузите изображение';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setServerMessage(null);
    if (!validate()) return;
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append('title', title);
      fd.append('lesson_num', String(lessonNum));
      fd.append('description', description);
      fd.append('text', text);
      if (imageFile) fd.append('image', imageFile);

      const res = await axios.post(`${BASE_URL}blog/posts/`, fd, {
        headers: {
          Authorization: access ? `Bearer ${access}` : '',
        },
      });

      setLoading(false);
      setServerMessage('Пост успешно добавлен');
      navigate('/blog');
    } catch (err: any) {
      setLoading(false);
      const resp = err?.response?.data;
      if (resp && typeof resp === 'object') {
        const fieldErrors: Record<string, string> = {};
        Object.keys(resp).forEach((k) => {
          const v = resp[k];
          fieldErrors[k] = Array.isArray(v) ? v.join(', ') : String(v);
        });
        setErrors(fieldErrors);
      } else {
        setServerMessage(
          err?.response?.data?.detail || err.message || 'Ошибка сети'
        );
      }
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Row>
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        {errors.title && <FieldError>{errors.title}</FieldError>}
      </Row>

      <Row>
        <Label>Lesson number</Label>
        <Input
          type="number"
          value={lessonNum}
          onChange={(e) =>
            setLessonNum(e.target.value === '' ? '' : Number(e.target.value))
          }
        />
        {errors.lesson_num && <FieldError>{errors.lesson_num}</FieldError>}
      </Row>

      <Row>
        <Label>Image</Label>
        <ImageUploader onFileChange={(f) => setImageFile(f)} />
        {errors.image && <FieldError>{errors.image}</FieldError>}
      </Row>

      <Row>
        <Label>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Row>

      <Row>
        <Label>Text</Label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ minHeight: 180 }}
        />
        {errors.text && <FieldError>{errors.text}</FieldError>}
      </Row>

      {serverMessage && <ServerMsg>{serverMessage}</ServerMsg>}

      <Actions>
        <CancelButton type="button" onClick={() => navigate(-1)}>
          Cancel
        </CancelButton>
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Add post'}
        </SubmitButton>
      </Actions>
    </FormWrapper>
  );
};

export default AddPostForm;

const FormWrapper = styled.form`
  width: 100%;
  max-width: 980px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-sizing: border-box;
  padding: 12px 6px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  padding: 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  min-height: 120px;
`;

const FieldError = styled.div`
  color: #d9534f;
  margin-top: 6px;
  font-size: 13px;
`;

const ServerMsg = styled.div`
  color: ${({ theme }) => theme.text};
  margin-top: 6px;
  font-size: 14px;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: stretch;
  }
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
`;
