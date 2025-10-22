import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { authApi } from '../../Api/authApi';
import FormTemplate from './FormTemplate';

const ActivateUser = () => {
  const { uid } = useParams();
  const location = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  useEffect(() => {
    const activate = async () => {
      try {
        if (!uid || !token) {
          setStatus('error');
          return;
        }

        await authApi.activateUser(uid, token);
        setStatus('success');
      } catch {
        setStatus('error');
      }
    };

    activate();
  }, [uid, token]);

  return (
    <FormTemplate title="Account Activation">
      {status === 'loading' && <p>Activating your account...</p>}
      {status === 'success' && (
        <p>Your account has been activated successfully!</p>
      )}
      {status === 'error' && (
        <p>Activation failed. Please check your link or contact support.</p>
      )}
    </FormTemplate>
  );
};

export default ActivateUser;
