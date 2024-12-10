import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import '../css/post.css';

function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get("https://backendservices-hsz0.onrender.com/post/get");
                const foundPost = response.data.posts.find(post => post.id === parseInt(id));
                setPost(foundPost);
            } catch (error) {
                console.error("Error fetching post details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleToggleLikeButton = () => {
        setPost(prevPost => ({
            ...prevPost,
            liked: !prevPost.liked,
        }));
    };

    const handleAddComment = (commentText) => {
        if (commentText.trim() === "") return;
        setPost(prevPost => ({
            ...prevPost,
            comments: [...prevPost.comments, { content: commentText, authorName: "You" }],
        }));
    };

    if (loading) return <p>Loading...</p>;
    if (!post) return <p>Post not found!</p>;

    return (
        <div style={{ backgroundColor: '#eaf5f4', minHeight: '100vh', padding: '20px' }}>
        <Row className="mt-3 justify-content-center align-items-center">
            <Col md={10} className="mb-4">
                <Card style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)", padding: "10px" }}>
                    <div className="d-flex align-items-center">
                        <img
                            src={post.neighbor?.profile_pic || ""}
                            alt={`${post.neighbor?.first_name || ""} ${post.neighbor?.last_name || ""}`}
                            width="40"
                            height="40"
                            style={{ borderRadius: "85%", marginRight: "10px" }}
                        />
                        <Link to={`/user/${post.neighbor?.id || ""}`}>
                            <strong>{post.neighbor?.first_name || ""} {post.neighbor?.last_name || ""}</strong>
                        </Link>
                        <div style={{ marginLeft: "auto", fontSize: "0.9em", color: "gray" }}>
                            {post.created_on || ""}
                        </div>
                    </div>
                    <Card.Title className="title mt-3">{post.title}</Card.Title>
                    <Card.Text>{post.content}</Card.Text>
                    <div>
                    <Button
                        variant={post.liked ? "warning" : "secondary"}
                        className="like-button"
                        onClick={handleToggleLikeButton}
                        
                    >
                        {post.liked ? "★" : "☆"}
                    </Button>
                    </div>
                    <div className="mt-3">
                        <h6 style={{ textDecoration: "underline" }}>Comments</h6>
                        {post.comments?.length > 0 ? (
                            post.comments.map((comment, index) => (
                                <div key={index}>
                                    <p>
                                        <Link to={`/user/${comment.neighbor_id || ""}`}>
                                            <strong>{comment.authorName}</strong>
                                        </Link>: {comment.content}
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
                                handleAddComment(commentText);
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
        </Row>
        </div>
    );
}

export default PostPage;
