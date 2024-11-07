import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import UserContext from './UserContext';  
import './css/login.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { setUser } = useContext(UserContext);  
    const navigate = useNavigate();

    
    useEffect(() => {
        const storedUser = sessionStorage.getItem('userSession');
        if (storedUser) {
            const userSession = JSON.parse(storedUser);
            setUser(userSession);  
            if (userSession.name.toLowerCase() === 'admin') {
                navigate('/feed');
            } else {
                navigate('/home');
            }
        }
    }, [navigate, setUser]);

    
    const handleLogin = (e) => {
        e.preventDefault();
        
        
        const storedUser = sessionStorage.getItem('userSession');
        const userSession = storedUser ? JSON.parse(storedUser) : null;

        if (userSession) {
            if (userSession.name === username && userSession.password === password) {
                const token = 'dummyToken'; // Simulate a token
                const authenticatedUser = {
                    ...userSession,
                    token: token
                };
                sessionStorage.setItem('userSession', JSON.stringify(authenticatedUser));  // Save authenticated user in sessionStorage
                setUser(authenticatedUser); 

                if (username.toLowerCase() === 'admin') {
                    navigate('/feed');
                } else {
                    navigate('/home');
                }
            } else {
                setErrorMessage('Invalid username or password!');
            }
        } else {
            setErrorMessage('No user data found, please register.');
        }
    };

    return (
        <Container>
            <h1 className="title-name">Login</h1>
            <Row className="form">
                <Col md={5}>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="usernameInput">
                            <Form.Label>Username: </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br></br>

                        <Form.Group controlId="passwordInput">
                            <Form.Label>Password: </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {errorMessage && (
                            <Alert variant="danger">
                                {errorMessage}
                            </Alert>
                        )}
                        <br></br>

                        <Button className="login-button" type="submit">
                            Login
                        </Button>

                        <div>
                            <p>Don't have an account yet?<br></br>
                            <NavLink to="/register">Register</NavLink> </p>
                        </div> 
                    </Form>
                </Col>
            </Row>
        </Container>
        
    );
}

export default LoginPage;
