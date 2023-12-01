import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Forumexample.css'; 
import winterbkg from '../assets/winterbkg.png';
import offcial from '../assets/official.png';
import recom1 from '../assets/recom1.png';
import recom2 from '../assets/recom2.png';
import recom3 from '../assets/recom3.png';
import { Link } from 'react-router-dom';


const Section = ({ title, children }) => {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
};

function Winter() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate(); 
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const imageBlocks = [
    { src: recom1, text: 'Finnish Culture', endpoint: '/Cultureexample' },
    { src: recom2, text: 'Finnish Food 101', endpoint: '/Foodexample' },
    { src: recom3, text: 'General tips', endpoint: '/Tipsexample' }
  ];
  
  const handleculture = () => {
    navigate('/Cultureexample'); 
  };

  const handlefood = () => {
    navigate('/Foodexample'); 
  };

  const handletips = () => {
    navigate('/Tipsexample'); 
  };

  const handleprofile = () => {
    navigate('/share'); 
  };

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
    <div>
      <Section className="Forums">
          <div className="forum-content">
            <img src={winterbkg} alt="winter background"></img>
          </div>
      </Section>
    <div className="post-container">
    <div className="post-header">
      <img src={offcial} alt="ISFGF" className="profile-pic" />
      <div>
        <h2 className='title'>Winter wonderland</h2>
        <div className='profile-info'>
          <h3 className='name'>ISFGF</h3> 
          <h3 className='location'>Helsinki, Finland</h3>
        </div>
      </div>
      <div className="tag">BLOGPOST</div>
    </div>
    <div className="post-body">
      <p>As a student new to Finland, experiencing your first winter here can be mesmerizing! The landscape transforms into a snowy wonderland, but it's also a time when temperatures drop significantly, and daylight becomes scarce. Finnish people seem to manage walking on icy grounds with ease, while we have to be extra careful. Therefore, it's important to invest in good quality shoes.<br /><br></br>
      Expect heavy snowfall and temperatures that often fall below zero. Days are shorter, especially in the north, where the sun barely rises. <br /><br></br>
      To prepare for the cold, be sure to invest in a good-quality insulated winter coat, thermal wear (like long johns), and woolen sweaters. Accessories such as gloves, hats, scarves, and especially waterproof boots with a solid grip for icy conditions are crucial.<br /><br></br>
      Despite the cold weather, winter in Finland is perfect for skiing, ice skating, or enjoying a warm sauna. It's a magical time of the year with opportunities to see the Northern Lights.
      </p>
    </div>
    <div className="post-footer">
      <div className="post-stats">
        Seen 923 times | 05 nov. 2023
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
        />
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
  <Section title="Recommendations for you">
  <div className="image-text-container">
    {imageBlocks.map((block, index) => (
      <div className="image-block" key={index}>
        <Link to={block.endpoint}> {/* Add Link component with 'to' prop */}
          <img src={block.src} alt={block.text} className="image" />
        </Link>
        <div className="text">{block.text}</div>
      </div>
    ))}
  </div>
</Section>

      <Section title="">
        <div className="story-share">
          <h1 className='story-text1'>Share your story</h1>
          <p className='story-text2'>Do you want to keep track of your journey? Or do you prefer to connect with others who are also new in Finland? Please share your story and experiences here!</p>
          <button className="share-story-button" onClick={handleprofile}>Click here</button>
        </div>
      </Section>
  </div>
  );
}

export default Winter;