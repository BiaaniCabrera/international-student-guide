import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backgroundImage from './assets/tembkg.png';
import './Profile.css';
import recom1 from './assets/recom1.png';
import recom2 from './assets/recom2.png';
import recom3 from './assets/recom3.png';

const Section = ({ title, children }) => {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
};

const ChecklistItem = ({ text, isComplete, onToggle }) => {
  return (
    <div className={`checklist-item ${isComplete ? 'complete' : ''}`} onClick={onToggle}>
      {isComplete ? '✓' : '○'} {text}
    </div>
  );
};

function Profile() {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Retrieve the profile image data URL from local storage
    const storedProfileImage = localStorage.getItem('profileImage');
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
  }, []);

  const [items, setItems] = useState([
    { id: 1, text: 'Arrived at the airport', isComplete: false },
    { id: 2, text: 'Weather appropriate clothing', isComplete: true },
    { id: 3, text: 'Connected with a local', isComplete: false },
    { id: 4, text: 'Shared a story', isComplete: false },
    { id: 5, text: 'Made a comment', isComplete: false },
  ]);

  const toggleComplete = (id) => {
    setItems(items.map((item) =>
      item.id === id ? { ...item, isComplete: !item.isComplete } : item
    ));
  };

  const completedCount = items.filter((item) => item.isComplete).length;
  const progressPercentage = (completedCount / items.length) * 100;
  const imageBlocks = [
    { src: recom1, text: 'First Day' },
    { src: recom2, text: 'New people' },
    { src: recom3, text: 'New Culture' },
  ];

  const [userInfo, setUserInfo] = useState({ username: '', email: '' });
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/userinfo', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Response:', response.data);
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Save the image data URL to local storage
        localStorage.setItem('profileImage', event.target.result);
        // Set the profileImage state to display the uploaded image
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  

  return (
    <div>
      <Section title="">
        <div className="welcome-banner" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="welcome-text">
            <h1>Welcome back</h1>
            <h1 className='username'>{userInfo.username}</h1>
          </div>
          <div className="profile-image-container">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="profile-image" />
            ) : (
              <label htmlFor="profile-image-upload" className="profile-image-upload-label">
                Upload Profile Picture
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
            )}
          </div>
        </div>
      </Section>

      <Section title="Your shared stories">
        <div className="image-text-container">
          {imageBlocks.map((block, index) => (
            <div className="image-block" key={index}>
              <img src={block.src} alt={block.text} className="image" />
              <div className="text">{block.text}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title='Process of your checklist'>
        <div className="checklist">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          {items.map((item) => (
            <ChecklistItem
              key={item.id}
              text={item.text}
              isComplete={item.isComplete}
              onToggle={() => toggleComplete(item.id)}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}

export default Profile;
