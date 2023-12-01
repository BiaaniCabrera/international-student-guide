import React, { useState, useEffect } from 'react';
import axios from 'axios';
import iconforum from '../assets/icon-forum.png';

const PostComponent = ({ post }) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [imageSrc, setImageSrc] = useState(null); // State to store image source

  useEffect(() => {
    // Fetch the image using the filename and filepath from the post
    if (post.filename && post.filepath) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/${post.filepath}/${post.filename}`, {
          responseType: 'blob', // Ensure response is treated as binary data
        })
        .then((response) => {
          const imageUrl = URL.createObjectURL(response.data);
          setImageSrc(imageUrl);
        })
        .catch((error) => {
          console.error('Error fetching image:', error);
        });
    }
  }, [post.filename, post.filepath]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      setComments([...comments, commentText]);
      setCommentText('');
    }
  };

  return (
    <div className="post-container">
      <div className="post-header">
      <img src={iconforum} alt=""  className='profile-pic'></img>

        <div>
          <h2 className='title'>{post.title}</h2>
          <div className='profile-info'>
            <h3 className='name'>{post.author}</h3>
            <h3 className='location'>{post.location}</h3>
          </div>
        </div>
        <div className="tag">CULTURE</div>
      </div>
      <div className="post-body">
        <p>{post.content}</p>
      </div>
      <div className="post-footer">
        <div className="post-stats">
          Seen {post.views} times | {new Date(post.createdAt).toLocaleDateString()}
        </div>
        <div className="post-actions">
          <button onClick={handleLike}>❤️ Like it</button>
          <span>{likes} reaction{likes !== 1 ? 's' : ''}</span>
        </div>
      </div>
      <div className="post-comments">
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="Add a comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="comment-input"
          />
          <button type="submit" className="comment-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostComponent;
