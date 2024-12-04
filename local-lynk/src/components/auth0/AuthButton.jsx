import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const AuthButton = () => {
    const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

    const handleLogout = () => {
        logout({
            returnTo: window.location.origin, // Redirects to home after logout
        });
    };

    const handleLogin = async () => {
        // Start Auth0 login process
        await loginWithRedirect();
    };

    const checkUserEmail = async () => {
        if (isLoading || !user) return; // Wait until Auth0 is done loading the user

        const userEmail = user.email; // Retrieve email from Auth0 user object
        const backendEndpoint = "https://my-backend.com/neighbor/get/email"; // Update with your backend URL

        try {
            const response = await axios.get(`${backendEndpoint}/${userEmail}`);
            if (response.status === 200) {
                // User exists, redirect to feed
                window.location.href = `${window.location.origin}/feed`;
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // User does not exist, redirect to register
                window.location.href = `${window.location.origin}/register`;
            } else {
                console.error("Error verifying user:", error.message);
            }
        }
    };

    // Run email check only if authenticated
    if (isAuthenticated) {
        checkUserEmail();
    }

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
