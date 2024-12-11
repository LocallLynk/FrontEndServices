import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from '@auth0/auth0-react';
import AuthButton from "./components/auth0/AuthButton.jsx";  // Import AuthButton

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

const redirectUri = 
  window.location.hostname === 'localhost'
    ? 'http://localhost:5173/' // Redirect to root in development
    : 'https://locallynk.vercel.app/'; // Redirect to root in production

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: redirectUri
     }}
  >
    <BrowserRouter>
      {/* Only show AuthButton on the homepage */}
      {window.location.pathname === "/" && <AuthButton />}
      <App />
    </BrowserRouter>
  </Auth0Provider>
);
