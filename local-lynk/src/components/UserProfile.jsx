import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

function UsersProfile() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleMessage = () => {
        console.log("This is the message button! We will write this code once the chat feature is ready!")
    }

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


    if (loading) return <p>Loading....</p>

    return(
        <div style={{ backgroundColor: '#eaf5f4', minHeight: '100vh', padding: '20px' }}>
            {user ? (
                <>
                    <h2> <img
                        src={user?.picture?.thumbnail}
                        alt={`${user?.name?.first} ${user?.name?.last}`}
                        width="80"
                        height="80"
                      />
                      {user.name.first} {user.name.last}</h2>
                    <p>{user.username}</p>
                    <p><strong>City: </strong>{user.location.city}</p>
                    <p><strong>Email: </strong>{user.email}</p>

                    <Button onClick={handleMessage} style={{ backgroundColor: '#016b66' }}>Message</Button>
                </>
            ):(
                <p>User not found.</p>
            )}
        </div>
    );
}

export default UsersProfile