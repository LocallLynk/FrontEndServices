import React, { useState, useEffect } from "react";
import axios from "axios";
import person from "../data/Randommuser.json";
import posts from "../data/JsonPlaceHolder.json"

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPostsForReal = async() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
    .then(response => {
      setPosts(response.data);
    })
    .catch(error => {
      console.error("Error fetching posts:", error);
    });
  }

  const getPosts = () => {
      setPosts(posts)
  }

  useEffect(() => {
      getPosts()
      setUsers(person)

  //  axios.get("https://randomuser.me/api/?results=10")
  //     .then(response => {
  //       setUsers(response.data.results);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching users:", error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Community Posts</h1>
      <div className="sample-posts">
        {posts.map((post, index) => {
          const user = users[index];
          return (
            <div className="post" key={post.id}>
              <div className="user-info">
                <img
                  src={user?.picture?.thumbnail}
                  alt={user?.name?.first}
                  className="user-avatar"
                />
                <div>
                  <strong>{user?.name?.first} {user?.name?.last}</strong>
                  <span>{user?.location?.city}, {user?.location?.country}</span>
                </div>
              </div>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FeedPage;
