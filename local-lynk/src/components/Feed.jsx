import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Spinner } from 'react-bootstrap';  // Bootstrap components

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });

    axios.get("https://randomuser.me/api/?results=10")
      .then(response => {
        setUsers(response.data.results);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center">Community Posts</h1>
      <Row className="mt-3 text-center">
        {posts.slice(0,5).map((post, index) => {
          const user = users[index];
          return (
            <Col key={post.id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={user?.picture?.thumbnail}
                      alt={`${user?.name?.first} ${user?.name?.last}`}
                      width="40"
                      height="40"
                    />
                      <strong>{user?.name?.first} {user?.name?.last}</strong>
                      <p>{user?.location?.city}, {user?.location?.country}</p>
                    </div>

                  <Card.Title className="title">{post.title}</Card.Title>
                  <Card.Text>{post.body}</Card.Text>
                  <Button variant="primary" className="like-button">Like</Button>
                  <Button variant="primary" className="comment-button">Comment</Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default FeedPage;
