import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const ProfilePicture = ({ user, onProfilePicChange }) => {
    const [isPicEditing, setIsPicEditing] = useState(false); 
    const [profilePic, setProfilePic] = useState(null); 

    const handleProfilePicChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result); 
                onProfilePicChange(reader.result);
            };
            reader.readAsDataURL(file); 
        }
    };

    const handlePicEditToggle = () => {
        setIsPicEditing(!isPicEditing);
    };

    return (
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
            <img
                src={profilePic || user.picture?.large}
                alt={`${user?.name?.first} ${user?.name?.last}`}
                width="100"
                height="100"
                style={{ borderRadius: '85%' }}
            />
            <div style={{ marginTop: '10px' }}>
                <Button onClick={handlePicEditToggle} style={{ backgroundColor: '#016b66' }}>
                    {isPicEditing ? 'Cancel' : 'Edit Profile Picture'}
                </Button>
            </div>
            {isPicEditing && (
                <Form.File 
                    id="profilePicUpload"
                    label="Upload New Profile Picture"
                    custom
                    onChange={handleProfilePicChange}
                    style={{ marginTop: '10px' }}
                />
            )}
        </div>
    );
};

export default ProfilePicture; // Ensure this is a default export!
