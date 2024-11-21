import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import ProfilePictureChanger from "./ChangeAvatar.jsx"
import Ratings from "./Services/StaticRatings.jsx";


function UsersProfile() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleMessage = () => {
        console.log("This is the message button! We will write this code once the chat feature is ready!")
    }

    // this code will need to be rewritten once we get backend!
    useEffect(() => {
        axios.get(`https://randomuser.me/api/?seed=${userId}`)
        .then(response => {
          setUser(response.data.results[0]);
          setLoading(false)
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    }, [userId]);

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
                            <strong>Created On:</strong>
                        </Card.Text>

                        
                        <Button onClick={handleMessage} style={{ backgroundColor: '#016b66', width: '100%' }}>
                            Message
                        </Button>
                    </Card.Body>
                </Card>
            ) : (
                <p>User not found.</p>
            )}
        </div>
    );
}

export default UsersProfile;
