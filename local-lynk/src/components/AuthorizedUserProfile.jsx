// This is the profile page of our user! Right now, since backend isn't connected and we need some authorization added to it, I'm just making it with the Random user API

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import Ratings from "./Services/Rating";

function AuthorizedUser() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedZipcode, setEditedZipcode] = useState('');
    const [editedUsername, setEditedUsername] = useState('');
   
    
    // this code will need to be rewritten once we get backend!
    useEffect(() => {
        axios.get(`https://randomuser.me/api/?seed=${userId}`)
        .then(response => {
          setUser(response.data.results[0]);
          setEditedZipcode(response.data.results[0].location?.postcode);
          setEditedUsername(userData.login.username)
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
            location: { postcode: editedZipcode }
        }))
        setIsEditing(false);
    };

    if (loading) return <p>Loading....</p>;

    return(
        <div style={{ backgroundColor: '#eaf5f4', minHeight: '100vh', padding: '20px' }}>
            {user ? (
                <Card style={{ width: '22rem', margin: 'auto', padding: 'auto', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Card.Body>
                        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                            
                            <img
                                src={user?.picture?.large}
                                alt={`${user?.name?.first} ${user?.name?.last}`}
                                width="100"
                                height="100"
                                style={{ borderRadius: '85%' }}
                            />
                        </div>
                        <Card.Title style={{ textAlign: 'center' }}>{user.name.first} {user.name.last}</Card.Title>
                        <Card.Subtitle style={{ textAlign: 'center'}}>{user.login.username}</Card.Subtitle>

                    {// Note that some of this information we will get from the backend! 
                        }
                        <Card.Text>
                            <strong>Zipcode: </strong>
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
                            <ul>
                                <li>One Skill</li>
                                <li>Another One</li>
                            </ul>
                        </Card.Text>
                        <Card.Text>
                            <strong>Created On:</strong><p>November 2024</p>
                        </Card.Text>

                        
                        <div>
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
