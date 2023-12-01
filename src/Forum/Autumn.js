import React, { useState} from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Forumexample.css'; 
import autumnbkg from '../assets/autumnbkg.jpg';
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

function Autumn() {
  const navigate = useNavigate(); 
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const imageBlocks = [
    { src: recom1, text: 'First Day'},
    { src: recom2, text: 'New people' },
    { src: recom3, text: 'New Culture' }
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Section className="Forums">
          <div className="forum-content">
            <img src={autumnbkg} alt="autumn background"></img>
          </div>
      </Section>
    <div className="post-container">
    <div className="post-header">
      <img src={offcial} alt="ISFGF" className="profile-pic" />
      <div>
        <h2 className='title'>Fall foliage</h2>
        <div className='profile-info'>
          <h3 className='name'>ISFGF</h3> 
          <h3 className='location'>Helsinki, Finland</h3>
        </div>
      </div>
      <div className="tag">BLOGPOST</div>
    </div>
    <div className="post-body">
      <p>Autumn in Finland is a brief yet breathtaking season, characterized by a stunning display of fall foliage. During this season, the temperature starts to drop, and the days get noticeably shorter. Rain becomes more frequent, and the first frosts arrive by late autumn.<br /><br></br>
      As the weather cools down, it's time to transition back to warmer clothing. Layer up with cozy sweaters and scarves, and a waterproof jacket is essential for the rainy days.<br /><br></br>
      Autumn is the perfect time to enjoy the colorful landscapes of Finland. It's great for forest walks, berry picking, and other outdoor activities. Moreover, it marks the beginning of the academic year, a busy and exciting time for students.
      </p>
    </div>
    <div className="post-footer">
      <div className="post-stats">
        Seen 755 times | 05 nov. 2023
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

export default Autumn;