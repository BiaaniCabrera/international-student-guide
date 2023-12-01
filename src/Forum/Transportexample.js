import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Forumexample.css'; 
import transportbkg from '../assets/transportbkg.png';
import mikka from '../assets/mikkaprofile.png';
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

function Transportexample() {
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
            <img src={transportbkg} alt="transport background"></img>
          </div>
      </Section>
    <div className="post-container">
    <div className="post-header">
      <img src={mikka} alt="Mikka L." className="profile-pic" />
      <div>
        <h2 className='title'>Navigating Public Transport</h2>
        <div className='profile-info'>
          <h3 className='name'>Mikka L.</h3> 
          <h3 className='location'>Helsinki, Finland</h3>
        </div>
      </div>
      <div className="tag">TRANSPORT</div>
    </div>
    <div className="post-body">
      <p>Hei everyone!<br /><br></br>
      Living in Finland has been an experience, one of the things I love the most of living in Helsinki is the public transport. <br /><br></br>
      It's been a lifesaver during my studies in Helsinki. The trams, buses, and trains are super reliable. You'll want to download the 'HSL App' to buy tickets and track schedules. <br /><br></br>
      Students get a discount, so get your student card as soon as you arrive. I've found that buying a monthly pass is most cost-effective if you're commuting daily. Also, don't shy away from biking during the warmer months. It's a great way to stay active and explore the city!
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

export default Transportexample;