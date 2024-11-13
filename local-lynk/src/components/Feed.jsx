import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Spinner, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NewPost from "./NewPost";

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(6);

  useEffect(() => {
    // Fetch posts
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        setPosts(response.data.map(post => ({ 
          ...post, 
          liked: false, 
          comments: [], 
          commentVisible: false 
        })));
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });

    // Fetch users
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

  const handleLoadMore = () => {
    if (visiblePosts < posts.length) {
      setVisiblePosts(visiblePosts + 6);
    }
  };

  const handleAddPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  }

  const handleToggleLikeButton = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, liked: !post.liked } : post
    ));
  };

  const handleAddComment = (postId, commentText) => {
    if (commentText.trim() === "") return;
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, comments: [...post.comments, commentText] } : post
    ));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#eaf5f4', minHeight: '100vh', padding: '20px', marginTop: '4px'}}>
      <h1 className="text-center">Community Posts</h1>

      <NewPost onAddPost={handleAddPost} />
      <Row className="mt-3">
        {posts.slice(0, visiblePosts).map((post, index) => {
          const user = users[index];
          if (!user) return null; // Skip rendering if no corresponding user

          return (
            <Col key={post.id} md={4} className="mb-4">
              <div>
                <Card style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}>
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={user.picture?.thumbnail}
                        alt={`${user.name?.first} ${user.name?.last}`}
                        width="40"
                        height="40"
                      />
                      <Link to={`/user/${user.login.uuid}`}>
                        <strong className="ml-2">{user.name?.first} {user.name?.last}</strong>
                      </Link>
                    </div>

                    <Card.Title className="title">{post.title}</Card.Title>
                    <Card.Text>{post.body}</Card.Text>
                    <Button 
                      variant={post.liked ? "warning" : "secondary"} 
                      className="like-button" 
                      onClick={() => handleToggleLikeButton(post.id)}
                    >
                      {post.liked ? "★" : "☆"}
                    </Button>

                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const commentText = e.target.elements.commentInput.value;
                        handleAddComment(post.id, commentText);
                        e.target.elements.commentInput.value = '';
                      }}
                    >
                      <Form.Group controlId="commentInput" className="mt-3">
                        <Form.Control type="text" placeholder="Add a comment" />
                      </Form.Group>
                      <Button variant="primary" type="submit" style={{ backgroundColor: '#016b66' }}>
                        Comment
                      </Button>
                    </Form>

                    <div className="mt-3">
                      <h6>Comments:</h6>
                      {post.comments.length > 0 ? (
                        post.comments.map((comment, idx) => (
                          <p key={idx} className="comment">{comment}</p>
                        ))
                      ) : (
                        <p>No comments yet.</p>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          );
        })}
      </Row>
      {visiblePosts < posts.length && (
        <Button onClick={handleLoadMore} className="mt-4" style={{ backgroundColor: '#016b66' }}>
          Load More
        </Button>
      )}
    </div>
  );
}

export default FeedPage;
