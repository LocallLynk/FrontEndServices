import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { user, isLoading } = useAuth0();
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    zipcode: "",
    password: "",
  });

  // State for error messages
  const [error, setError] = useState("");

  // Pre-fill basic user details from Auth0
  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        first_name: user.given_name || "",
        last_name: user.family_name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backendservices-hsz0.onrender.com/register",
        formData
      );
      if (response.status === 201) {
        // Redirect to /feed after successful registration
        navigate("/feed");
      }
    } catch (err) {
      console.error("Error registering user:", err);
      setError("Failed to register. Please try again.");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="register-container">
      <h1>Complete Your Registration</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            readOnly
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            readOnly
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Zipcode:
          <input
            type="text"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
