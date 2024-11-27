// This is the profile page of our user! Right now, since backend isn't connected and we need some authorization added to it, I'm just making it with the Random user API

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Card, Form, FormControl } from "react-bootstrap";
import Ratings from "../Features/StaticRatings";

function AuthorizedUser() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedZipcode, setEditedZipcode] = useState('');
    const [editedUsername, setEditedUsername] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [editedSkills, setEditedSkills] = useState(['One Skill', 'Another One']);
    const [newSkill, setNewSkill] = useState('');
   
    
    // this code will need to be rewritten once we get backend!
    useEffect(() => {
        axios.get(`https://randomuser.me/api/?seed=${userId}`)
        .then(response => {
          setUser(response.data.results[0]);
          setEditedZipcode(response.data.results[0].location?.postcode);
          setEditedUsername(response.data.results[0].login.username)
          setLoading(false)
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    }, [userId]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    // also will need to have this handleSave for the backend work!
    const handleSave = () => {
        console.log("Save changes.");
        setUser(prevState => ({
            ...prevState,
            location: { postcode: editedZipcode },
            login: { username: editedUsername },
            skills: editedSkills
        }))
        setIsEditing(false);
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];  // Get the first file from the input
        if (file) {
            if (file.type.startsWith('image/')) {
                const imageUrl = URL.createObjectURL(file);
                console.log("New image");
                setProfilePic(imageUrl); 
            } else {
                alert("Please select an image file.");
            }
        }
    };

    const handleAddSkill = () => {
        if (newSkill.trim()) {
            setEditedSkills([...editedSkills, newSkill.trim()]);
            setNewSkill('');
        }
    }

    const handleDeleteSkill = (skillDelete) => {
        setEditedSkills(prevSkills => prevSkills.filter(skill => skill !== skillDelete));
    };

    if (loading) return <p>Loading....</p>;

    return(
        <div style={{ backgroundColor: '#eaf5f4', minHeight: '100vh', padding: '20px' }}>
            {user ? (
                <Card style={{ width: '22rem', margin: 'auto', padding: 'auto', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Card.Body>
                        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                            
                            <img
                                src={profilePic || user?.picture?.large}
                                alt={`${user?.name?.first} ${user?.name?.last}`}
                                width="100"
                                height="100"
                                style={{ borderRadius: '85%' }}
                                
                            />
                            
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button 
                            onClick={() => document.getElementById('profilePicInput').click()}  // Trigger file input click
                            style={{ backgroundColor: '#7ED2D2', fontSize: '12px', padding: '5px 10px' }}>
                            📷
                        </Button>

                        <input
                            id="profilePicInput"
                            type="file"
                            accept="image/*"  // Only allow image files
                            style={{ display: 'none' }}
                            onChange={handleProfilePictureChange}
                        />
     
                        </div>
                        <Card.Title style={{ textAlign: 'center', marginTop: "3px" }}>{user.name.first} {user.name.last}</Card.Title>
                        <Card.Subtitle style={{ textAlign: 'center'}}>
                            {isEditing ? (
                                <FormControl
                                type="text"
                                minLength={0}
                                value={editedUsername}
                                placeholder="Enter new username"
                                onChange={e => setEditedUsername(e.target.value)}

                                />
                            ): (
                                user.login.username
                            )}
                            </Card.Subtitle>

                    {// Note that some of this information we will get from the backend! 
                        }
                        <Card.Text>
                            <strong className="mt-3">Zipcode: </strong>
                            {isEditing ? (
                                <Form.Control
                                    type="text"
                                    maxLength={5}
                                    value={editedZipcode}
                                    onChange={e => setEditedZipcode(e.target.value)}
                                />
                            ) : (
                                <p>{editedZipcode}</p>
                            )}
                        </Card.Text>

                        <Card.Text>
                            <strong>Overall Rating: <Ratings /> </strong>
                        </Card.Text>
                        <Card.Text>
                        <strong>Skills: </strong>
                            {isEditing ? (
                                <>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Form.Control
                                        type="text"
                                        style={{ width: '200px' }}
                                        value={newSkill}
                                        onChange={e => setNewSkill(e.target.value)}
                                        placeholder="Enter new skill"
                                    />
                                    <Button size="sm" onClick={handleAddSkill} style={{ marginTop: '2px', marginLeft: '5px', fontSize: '10px', backgroundColor: '#5D395F' }}>+</Button>
                                    </div>
                                    <ul>
                                        {editedSkills.map((skill, index) => (
                                            <li key={index}>
                                                {skill}
                                                <Button 
                                                    size="sm" 
                                                    onClick={() => handleDeleteSkill(skill)} 
                                                    style={{ marginLeft: '5px', padding: '2px 5px', fontSize: '10px', backgroundColor: '#016b66' }}
                                                >
                                                    -
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                <ul>
                                    {editedSkills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            )}
                        </Card.Text>

                        <Card.Text>
                            <strong>Created On:</strong><p>November 2024</p>
                        </Card.Text>

                        
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button onClick={handleEditToggle} style={{ backgroundColor: '#016b66' }}>{isEditing ? 'Cancel' : 'Edit Profile'}</Button>
    
                            {isEditing && (
                                <Button variant="success" onClick={handleSave} style={{ backgroundColor: '#5D395F', marginLeft: '10px' }}>
                                    Save Changes
                                </Button>
                            )}
                        </div>
                    </Card.Body>
                </Card>
            ) : (
                <p>User not found.</p>
            )}
        </div>
    );
}

export default AuthorizedUser;
