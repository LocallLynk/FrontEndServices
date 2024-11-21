import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import '../../css/login.css';

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        zipcode: '',
        password: '',
        confirmPassword: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match!');
            setSuccessMessage('');
        } else {
            setErrorMessage('');
            setSuccessMessage('Registration Successful!');
        }
    };

    return (
        <Container className="form-container">
            <h1 className="title-name text-center mb-4">User Registration</h1>
            <Form onSubmit={handleSubmit} className="registration-form text-right">
                <Form.Group controlId="name" className="form-group-spacing">
                    <Form.Label>Name: </Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter Full Name"
                        value={formData.name}
                        onChange={handleRegister}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="username" className="form-group-spacing">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        placeholder="Enter Username"
                        value={formData.username}
                        onChange={handleRegister}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="phone" className="form-group-spacing">
                    <Form.Label>Phone Number: </Form.Label>
                    <Form.Control
                        type="tel"
                        name="phone"
                        placeholder="Enter Phone Number"
                        value={formData.phone}
                        onChange={handleRegister}
                        pattern="[0-9]{10}"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="zipcode" className="form-group-spacing">
                    <Form.Label>Zipcode: </Form.Label>
                    <Form.Control
                        type="number"
                        name="zipcode"
                        placeholder="Enter Zipcode"
                        value={formData.zipcode}
                        onChange={handleRegister}
                        maxLength="5"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="email" className="form-group-spacing">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleRegister}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="password" className="form-group-spacing">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleRegister}
                        minLength="10"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="confirmPassword" className="form-group-spacing">
                    <Form.Label>Confirm Password: </Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleRegister}
                        minLength="10"
                        required
                    />
                </Form.Group>

                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}

                <Button variant="primary" type="submit" className="register-button">
                    Register
                </Button>
            </Form>
        </Container>
    );
}

export default RegisterPage;
