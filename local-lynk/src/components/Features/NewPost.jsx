import React, {useState} from 'react';
import { Card, Form, Button } from 'react-bootstrap';

function NewPost({ onAddPost }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    console.log("New post", onAddPost)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() && body.trim()) {
            const newPost = {
                id: Date.now(),
                title,
                body,
                liked: false,
                comments: [],
                user:{
                    name: {first: "Test", last: "User"},
                    login: { uuid: "current-user"}
                }
            };

            onAddPost(newPost);
        
            setTitle("");
            setBody("");
        }
    };

    return (
            <div className="align-items-center justify-content-center d-flex">
            <Form className='w-50 p-3 bg-white shadow rounded' onSubmit={handleSubmit}>
            <h4>Create A Post</h4>
                <Form.Group controlId='postTitle'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='postBody'>
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder='Enter body'
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" style={{ backgroundColor: '#016b66', marginTop: '6px' }}>
                    Add Post
                </Button>
            </Form>
        </div>
    );
}

export default NewPost;