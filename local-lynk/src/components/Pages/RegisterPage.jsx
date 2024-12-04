import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "../css/register.css";

const RegisterPage = () => {
  const { user, isLoading } = useAuth0();
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();

  // State for form inputs
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    zipcode: "",
    skills: [],
    otherSkill: "",
  });

  const skillOptions = [
    { value: "Web Development", label: "Web Development" },
    { value: "Data Science", label: "Data Science" },
    { value: "Graphic Design", label: "Graphic Design" },
    { value: "Marketing", label: "Marketing" },
    { value: "Project Management", label: "Project Management" },
    { value: "Other", label: "Other" },
  ];

  // State for error messages
  const [error, setError] = useState("");

  // Pre-fill username from Auth0 if available
  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        username: user.nickname || "",
      }));
    }
  }, [user]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle skill selection
  const handleSkillChange = (selectedOptions) => {
    const selectedSkills = selectedOptions.map((option) => option.value);
    setFormData({
      ...formData,
      skills: selectedSkills,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for "Other" skill with missing input
    if (formData.skills.includes("Other") && !formData.otherSkill.trim()) {
      setError("Please specify your other skill.");
      return;
    }

    // Combine "Other" skill if filled
    const allSkills = formData.skills.includes("Other")
      ? [...formData.skills.filter((skill) => skill !== "Other"), formData.otherSkill.trim()]
      : formData.skills;

    const payload = { ...formData, skills: allSkills };

    try {
      const response = await axios.post("https://backendservices-hsz0.onrender.com/register", payload);
      if (response.status === 201) {
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
      <h1>Hey Neighbor!</h1>
      <h2>You&apos;re almost ready to meet your community</h2>
      <p>Please Complete This form</p>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            maxLength={20} // Character limit for username
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
            maxLength={15} // Character limit for phone
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
            maxLength={10} // Character limit for zipcode
          />
        </label>
        <label>
          Skills:
          <Select
            components={animatedComponents}
            isMulti
            options={skillOptions}
            onChange={handleSkillChange}
          />
        </label>
        {formData.skills.includes("Other") && (
          <label>
            Specify Other Skill:
            <input
              type="text"
              name="otherSkill"
              value={formData.otherSkill}
              onChange={handleChange}
              required
            />
          </label>
        )}
        <button type="submit">Complete Registration</button>
      </form>
    </div>
  );
};

export default RegisterPage;
