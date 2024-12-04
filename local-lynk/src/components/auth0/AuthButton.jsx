import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

const AuthButton = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    const handleLogout = () => {
        logout({
            returnTo: window.location.origin, // Redirects to home after logout
        });
    };

    const handleLogin = () => {
        loginWithRedirect(); // No need for redirect_uri since the action handles it
    };

    return isAuthenticated ? (
        <Button onClick={handleLogout} className="auth-btn">
            Log Out
        </Button>
    ) : (
        <Button onClick={handleLogin} className="auth-btn">
            Log In / Sign Up
        </Button>
    );
};

export default AuthButton;
