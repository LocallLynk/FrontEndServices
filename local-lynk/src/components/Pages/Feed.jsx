import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Spinner, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NewPost from "../Features/NewPost";
import "../css/Feed.css";

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://backendservices-hsz0.onrender.com/post/get");
        const { posts } = response.data;

        const mappedPosts = posts.map(post => ({
          ...post,
          authorName: `${post.neighbor.first_name} ${post.neighbor.last_name}`,
          liked: false, // Initialize the liked state
          comments: post.comments.map(comment => ({
            ...comment,
            authorName: `${comment.neighbor.first_name} ${comment.neighbor.last_name}`,
          })),
        }));

        setPosts(mappedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleAddPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleToggleLikeButton = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, liked: !post.liked } : post
    ));
  };

  const handleAddComment = (postId, commentText) => {
    if (commentText.trim() === "") return;
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, comments: [...post.comments, { content: commentText }] } : post
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
    <div style={{ backgroundColor: '#eaf5f4', minHeight: '100vh', padding: '20px', marginTop: '4px' }}>
      <h1 className="text-center">Community Posts</h1>

      <NewPost onAddPost={handleAddPost} />

      <Row className="mt-3 justify-content-center align-items-center">
        {posts.map((post) => (
          <Col key={post.id} md={10} className="mb-4">

            {// Profile image, name, and date should all be on the same line now
            }
            <Card style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)", padding: "10px" }} >
                <div className="d-flex align-items-center">
                  <img
                    src={post.neighbor?.profile_pic}
                    alt={`${post.authorName}`}
                    width="40"
                    height="40"
                    style={{ borderRadius: "85%", marginRight: "10px" }}

                  />
                  <Link to={`/user/${post.neighbor?.id}`} >
                    <strong>{post.authorName}</strong>
                  </Link>
                  <div
                    style={{ marginLeft: "auto", fontSize: "0.9em", color: "gray",}}> {post.created_on}
                  </div>
                  </div>
               
                <Card.Title className="title mt-3">{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
                <div>
                <Button
                  variant={post.liked ? "warning" : "secondary"}
                  className="like-button"
                  onClick={() => handleToggleLikeButton(post.id)}
                >
                  {post.liked ? "★" : "☆"}
                </Button>
                </div>

                <div className="mt-3">
                  <h6 style={{ textDecoration: "underline"}}>Comments</h6>
                  {post.comments.length > 0 ? (
                    post.comments.map((comment, index) => (
                      <div key={index}>
                        <p>
                          <Link to={`/user/${comment.neighbor_id}`}>
                          <strong>{comment.authorName}</strong></Link>: {comment.content}
                          
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No comments yet.</p>
                  )}

                  <Form
                    onSubmit={e => {
                      e.preventDefault();
                      const commentText = e.target.elements.commentInput.value;
                      handleAddComment(post.id, commentText);
                      e.target.elements.commentInput.value = '';
                    }}
                  >
                    <Form.Group controlId="commentInput" className="mt-3">
                      <Form.Control
                        type="text"
                        placeholder="Add a comment"
                        name="commentInput"
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      className="comment-button mt-3"
                      style={{ backgroundColor: "#016b66" }}
                    >
                      Comment
                    </Button>
                  </Form>
                </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default FeedPage;
