import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Forumexample.css'; 
import guildbkg from '../assets/guildbkg.png';
import kalle from '../assets/kalleprofile.png';
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

function Guildexample() {
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
            <img src={guildbkg} alt="guild background"></img>
          </div>
      </Section>
    <div className="post-container">
    <div className="post-header">
      <img src={kalle} alt="Kalle S." className="profile-pic" />
      <div>
        <h2 className='title'>Teekkarilakki</h2>
        <div className='profile-info'>
          <h3 className='name'>Kalle S.</h3> 
          <h3 className='location'>Helsinki, Finland</h3>
        </div>
      </div>
      <div className="tag">GUILDS</div>
    </div>
    <div className="post-body">
      <p>Hi! I'm Kalle, and I'm here to give you the lowdown on one of Finland's coolest student traditions – the Student Guilds! These guilds are like clubs, each associated with a specific field of study, and they're central to student life here in Finland. They organize events, parties, and excursions, providing a fantastic way to meet people and find a community.<br /><br></br>
      Now, let's talk about the student cap - the 'teekkarilakki'. It's a white cap with a black visor, symbolizing your study field and worn by engineering students, though variations exist for other faculties. It's not just a hat; it's a badge of honor that comes with a sense of belonging and a rich history.<br /><br></br>
      At the start of the academic year, attend the opening fairs where all guilds present themselves. Choose one that aligns with your study area and interests, sign up, and pay a small membership fee. Being part of a guild is one of the best ways to integrate into the student culture and make the most out of your time in Finland. Plus, you get to wear a cool cap! So don't be shy, join a guild and dive into the Finnish student experience. Nähdään! 
      </p>
    </div>
    <div className="post-footer">
      <div className="post-stats">
        Seen 456 times | 13 nov. 2023
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

export default Guildexample;