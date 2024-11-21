import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Spinner, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import NewPost from "./NewPost";

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState([]); //new state for person
  const [results, setResults] = useState([]);
  // const [visiblePosts, setVisiblePosts] = useState(6);


  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        setPosts(response.data.map(post => ({ 
          ...post, 
          liked: false, 
          comments: [], 
          commentVisible: false 
        })));
        setResults(response.data);
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });


    axios.get("https://randomuser.me/api/?results=36")
      .then(response => {
        setUsers(response.data.results);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); //  dynamic pass id (`$uuid`) not using state to store it, because not using state, it's redoing the api call, make another api call that gets a specific person. Store that in a state. Can pass as a prop
  // function takes in parameter, take in id, want all other information, put it in state
  

  // const handleLoadMore = () => {
  //   setVisiblePosts(preVisiblePosts => preVisiblePosts + 6);
  // };

  const handleAddPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  }

  // not taking the post and doing anything with it, which may be where the issue is, fix this, go check old work to double check
  // pass that post threw, what is happening i am passing the entire function 

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

      {// this is the start of the posts row
      }
      <Row className="mt-3 justify-content-center align-items-center">
          {posts.map((post, index) => {
          const user = users[index];
          if (!user) return null;
        

          return (
            <Col key={post.id} md={10} className="mb-4">
              <div>
                <Card style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)" }}>
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={user.picture?.thumbnail}
                        alt={`${user.name?.first} ${user.name?.last}`}
                        width="40"
                        height="40"
                      />
                      <Link to={`/user/${user.login.username}`}>
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
                      <Button variant="primary" type="submit" className="mt-3" style={{ backgroundColor: '#016b66' }}>
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
      {/* {visiblePosts < posts.length && (
        <Button onClick={handleLoadMore} className="mt-4" style={{ backgroundColor: '#016b66' }}>
          Load More
        </Button>
      )} */}
    </div>
  );
}

export default FeedPage;