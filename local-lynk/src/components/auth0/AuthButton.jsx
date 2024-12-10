import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import { useEffect } from "react";

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

    const checkUserData = async (email) => {
        const backendEndpoint = "https://backendservices-hsz0.onrender.com/neighbor/get/email"; // Backend URL for email check
    
        try {
            console.log("Checking user data for email:", email); // Debug log
    
            const response = await fetch(`${backendEndpoint}/${email}`);
            
            if (response.ok) {
                // Status 200: User exists
                const data = await response.json(); // Parse JSON response if needed
                console.log("User exists, response data:", data); // Debug log
                console.log("User exists, redirecting to feed...");
                window.location.href = `${window.location.origin}/feed`;
            } else if (response.status === 404) {
                // Status 404: User does not exist
                console.log("User not found, redirecting to register...");
                window.location.href = `${window.location.origin}/register`;
            } else {
                // Handle other unexpected status codes
                console.error("Unexpected response status:", response.status);
                alert("An unexpected error occurred. Please try again.");
            }
        } catch (error) {
            // Handle network or unexpected errors
            console.error("Network error verifying user:", error);
            alert("Unable to connect to the server. Please check your network and try again.");
        }
    };
    

    // Use useEffect to handle the email check after login is complete
    useEffect(() => {
        console.log("Auth0 State - isAuthenticated:", isAuthenticated);
        console.log("Auth0 State - user:", user);
        console.log("Auth0 State - isLoading:", isLoading);

        if (isAuthenticated && user?.email && !isLoading) {
            console.log("User is authenticated, checking user data...");
            checkUserData(user.email);
        }
    }, [isAuthenticated, isLoading, user]);

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

