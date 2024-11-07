import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router';

const Auth0ProviderWithNavi = ({ children }) => {
    const navigate = useNavigate();
    //const domain = //pass ;
    //const clientId = //pass ;
    const redirectUri = "http://localhost:3000/callback";
}