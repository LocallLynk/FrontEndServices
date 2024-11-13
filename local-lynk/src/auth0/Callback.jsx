import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const Callback = () => {
  const { error, isLoading, isAuthenticated, handleRedirectCallback } = useAuth0();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const authenticateUser = async () => {
      if (!isLoading) {
        try {
          await handleRedirectCallback();
        } catch (error) {
          console.error('Error during authentication callback:', error);
          setAuthError('An error occurred during authentication. Please try again.');
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

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      {authError ? (
        <div className="error-message">
          <p>{authError}</p>
        </div>
      ) : (
        <Spinner animation="border" variant="primary" />
      )}
    </div>
  );
};

export default Callback;



