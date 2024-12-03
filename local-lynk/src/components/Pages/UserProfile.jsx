import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

function UsersProfile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    const handleMessage = () => {
        console.log("This is the message button! We will write this code once the chat feature is ready!")
    }

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await axios.get(`https://backendservices-hsz0.onrender.com/neighbor/get`);
            const userData = response.data.data.find((user) => user.id === parseInt(id)); 
            setUser(userData);

            const postResponse = await axios.get(`https://backendservices-hsz0.onrender.com/post/get`);
            const userPosts = postResponse.data.posts.filter((post) => post.neighbor.id === parseInt(id));
            setPosts(userPosts);
            
          } catch (error) {
            console.error("Error fetching user data:", error);
          } finally {
            setLoading(false);
          }
        };

        fetchUser();
    }, [id]);

    if (loading) return <p>Loading....</p>;
    if (!user) return <p>User not found!</p>;

    return(
        <div style={{ backgroundColor: '#eaf5f4', minHeight: '100vh', padding: '20px' }}>
                <Card style={{ width: '22rem', margin: 'auto', padding: 'auto', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Card.Body>
                        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                            <img
                                src={user.profile_pic}
                                alt={`${user.first_name} ${user.last_name}`}
                                width="100"
                                height="100"
                                style={{ borderRadius: '85%' }}
                            />
                        </div>
                        <Card.Title style={{ textAlign: 'center' }}>{user.first_name} {user.last_name}</Card.Title>
                        <Card.Subtitle style={{ textAlign: 'center'}}>{user.username}</Card.Subtitle>
                        <Card.Text>
                            <strong>Zipcode: </strong> {user.zipcode}
                        </Card.Text>
                        <Card.Text>
                            <strong>Overall Rating: </strong>{user.overall_rating  ? [...Array(user.overall_rating)].map((_, index) => <span key={index}>⭐️ </span>) : "No ratings yet."}  
                                ({user.num_ratings} reviews)
                        </Card.Text>
                        <Card.Text>
                            <strong>Skills: </strong>
                            {user.skills && user.skills.length > 0 ? (
                                <ul>
                                    {user.skills.map((skills) => (
                                        <li key={skills.id}>
                                            <strong>{skills.name}:</strong> {skills.description}
                                            <li style={{ marginLeft: '18px', listStyleType: "square" }}>{skills.experience}</li>
                                        </li>
                                    ))}
                                </ul>
                            ): (
                                <li>No skills listed.</li>
                            )}
                        </Card.Text>
                        <Card.Text>
                            <strong>Created On:</strong> {user.created_on}
                        </Card.Text>

                        <h4>Posts by {user.first_name}</h4>
                        {posts.length > 0 ? (
                            <ul>
                                {posts.map(post => (
                                    <li key={post.id} style={{ listStyleType: "circle", color: "darkslategray", textDecoration: "underline"}}>
                                        {post.title}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                        <li>No posts available yet.</li>
                        )}

                        <Button onClick={handleMessage} style={{ backgroundColor: '#016b66', width: '100%', marginTop: '8px' }}>
                            Message
                        </Button>
                    </Card.Body>
                </Card>
        </div>
    );
}

export default UsersProfile;
