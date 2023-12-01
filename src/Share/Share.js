import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import sharebkg from '../assets/sharebkg.png';
import recom1 from '../assets/recom1.png';
import recom2 from '../assets/recom2.png';
import recom3 from '../assets/recom3.png';
import icon from '../assets/uploadicon.png';
import './Share.css';

const Section = ({ title, children }) => {
  return (
    <section>
      
      {children}
    </section>
  );
};

function Share() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', text);
    if (file) {
      formData.append('file', file); // Append the uploaded file to the form data
    }

    const token = localStorage.getItem('token');

    axios.post(`${process.env.REACT_APP_API_URL}/api/forum/posts`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => {
      console.log('Post submitted successfully', response.data);
      // Optionally reset the state or navigate to another page
    })
    .catch(error => {
      console.error('Error submitting post', error);
      // Handle error
    });
  };

  const imageBlocks = [
    { src: recom1, text: 'Finnish Culture', endpoint: '/Cultureexample' },
    { src: recom2, text: 'Finnish Food 101', endpoint: '/Foodexample' },
    { src: recom3, text: 'General tips', endpoint: '/Tipsexample' }
  ];

  return (
    <div>
      <Section className="header">
        <div className="header-content">
          <img src={sharebkg} alt="header background"></img>
        </div>
      </Section>

      <Section title="Share your story">
        <div className="story-share">
          <h1 className='story-text1'>Share your story in the forum</h1>
          <p className='story-text2'>Do you want to keep track of your journey? Or do you prefer to connect with others who are also new in Finland? Please share your story and experiences here!</p>
          <form onSubmit={handleSubmit}>
            <textarea
              type="text"
              placeholder="Title"
              value={title}
              onChange={handleTitleChange}
            />
            <textarea
              placeholder="Type here..."
              value={text}
              onChange={handleTextChange}
            />
            <div>
           
              <div className='button'>
                <button className="share-story-button2" type="submit">SEND</button>
              </div>
            </div>
          </form>
          {file && (
            <div className='filedetail'>
              <p>File name: {file.name}</p>
              <p>File type: {file.type}</p>
              <p>File size: {file.size} bytes</p>
            </div>
          )}
        </div>
      </Section>

      <Section title="Overview of your stories">
        <div className="image-text-container">
          {imageBlocks.map((block, index) => (
            <div className="image-block" key={index} onClick={() => navigate(block.endpoint)}>
              <img src={block.src} alt={block.text} className="image" />
              <div className="text">{block.text}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

export default Share;
