import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const RegisterPage = () => {
  const { user } = useAuth0(); // Get the user info from Auth0
  const navigate = useNavigate();

  // State to store form data
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: user?.email || "", // Pre-fill email with Auth0 email
    phone: "",
    username: "",
    password: "",
    zipcode: "",
    profile_pic: "",
    overall_rating: 0,
    num_ratings: 0,
    num_rated: 0,
    task_neighbor: false,
    client_neighbor: false,
    admin: false,
    skills: [],
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to the backend to create the user profile
      const response = await axios.post("http://localhost:5000/api/neighbors", formData);
      
      if (response.status === 200) {
        // Redirect to the feed page after successful registration
        navigate("/feed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle error
    }
  };

  return (
    <div className="register-page">
      <h2>Register Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="zipcode">Zipcode</label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="profile_pic">Profile Picture URL (optional)</label>
          <input
            type="text"
            id="profile_pic"
            name="profile_pic"
            value={formData.profile_pic}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
