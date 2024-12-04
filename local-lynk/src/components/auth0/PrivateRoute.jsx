import { Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = () => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    if (isLoading) return <div>Loading...</div>; // Show loading state

    // If the user is authenticated, show the private route (Outlet), else trigger login
    if (!isAuthenticated) {
        loginWithRedirect(); // Redirect to Auth0 login page
        return null; // You can return null as the component is redirected.
    }

    return <Outlet />;
};

export default PrivateRoute;
