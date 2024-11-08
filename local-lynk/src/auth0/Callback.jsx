import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const { error, isLoading, isAuthenticated, handleRedirectCallback } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      if (!isLoading) {
        try {
          await handleRedirectCallback();
        } catch (error) {
          console.error('Error during authentication callback:', error);
        } finally {
          if (isAuthenticated) {
            navigate('/feed');  // Redirect to the feed page if authenticated
          } else {
            navigate('/');  // Redirect to the home page if not authenticated
          }
        }
      }
    };

    authenticateUser();
  }, [isLoading, isAuthenticated, error, navigate, handleRedirectCallback]);

  return <div>Loading...</div>;
};

export default Callback;


