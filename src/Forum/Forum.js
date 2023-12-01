import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostComponent from './PostComponent'; // Make sure the path is correct
import './Forum.css';
import { posts } from '../utils'; // Import your data

// Define a function to import images dynamically
function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)$/));

const Section = ({ title, children }) => {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
};

function Forum() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [recommendedPosts, setRecommendedPosts] = useState([]); // New state for recommended posts
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3001/forum/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  useEffect(() => {
    // Randomly select 3 posts from MongoDB
    const shuffledPosts = posts.sort(() => 0.5 - Math.random()).slice(0, 3);
    setRecommendedPosts(shuffledPosts);
  }, [posts]); // Listen for changes in posts

  const goToPost = (postId) => {
    const post = posts.find((p) => p._id === postId);
    setSelectedPost(post);
  };

  const handleprofile = () => {
    navigate('/share');
  };

  const handlePostsClick = (postId) => {
    // Redirect to the PostComponent with the selected postId
    navigate(`/post/${postId}`);
  };

  return (
    <div className="Forum">
      <Section className="Forums">
        <div className="forum-content">
          {/* your background image */}
        </div>
      </Section>

      {selectedPost ? (
        <PostComponent post={selectedPost} />
      ) : (
        <Section title="Forum Posts">
          <div className="posts-list">
            {posts.map((post) => (
              <div
                key={post._id}
                onClick={() => goToPost(post._id)}
                className="post"
              >
                <h3 className="post-title">{post.title}</h3>
                <p className="post-details">
                  <span className="post-author">{post.author}</span> |{' '}
                  <time className="post-date">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </time>
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}



      <Section>
        <div className="story-share">
          <h1 className="story-text1">Share your story</h1>
          <p className="story-text2">
            Do you want to keep track of your journey? Or do you prefer to
            connect with others who are also new in Finland? Please share your
            story and experiences here!
          </p>
          <button className="share-story-button" onClick={handleprofile}>
            Click here
          </button>
        </div>
      </Section>
    </div>
  );
}

export default Forum;
