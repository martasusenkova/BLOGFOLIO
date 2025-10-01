import { useNavigate } from 'react-router-dom';

/**
 * @returns {function}
 */
export const useSearch = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      navigate(`/searchresult?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return handleSearchSubmit;
};
