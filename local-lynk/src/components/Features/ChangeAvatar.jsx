import React, { useState } from "react";
import { Button } from "react-bootstrap";

const ChangeProfilePicture = ({ onProfileChange }) => {
    const [pictureFile, setPictureFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith("image/")) {
            setPictureFile(selectedFile);
            const imageUrl = URL.createObjectURL(selectedFile);
            onPictureChange(imageUrl);
            console.log("Profile picture was changed!", imageUrl)
        } else {
            alert("Please select an image file.")
        }
    };

    return (
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
            {pictureFile && (
                <img
                src={URL.createObjectURL(pictureFile)}
                alt="Profile Picture for Authorized User"
                width="100"
                height="100"
                style={{ borderRadius: '85%' }}
                />
            )}
            <br />
            <Button onClick={() => document.getElementById('fileInput').click()}
                style={{ backgroundColor: '#7ED2D2', fontSize: '12px', padding: '5px 10px' }}>
                📷 Change Picture
            </Button>
            <input
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </div>
    );
};

export default ChangeProfilePicture;
