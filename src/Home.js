import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 
import cultureIcon from './assets/c-icon.png';
import foodIcon from './assets/f-icon.png';
import clothesIcon from './assets/cl-icon.png';
import tipsIcon from './assets/t-icon.png';
import guildsIcon from './assets/s-icon.png';
import transportIcon from './assets/p-icon.png';
import storiesIcon from './assets/story-icon.png';
import housingIcon from './assets/h-icon.png';
import NavIcon1 from './assets/icon1.png';
import NavIcon2 from './assets/icon2.png';
import NavIcon3 from './assets/icon3.png';
import winterIcon from './assets/winter.png';
import springIcon from './assets/spring.png';
import summerIcon from './assets/summer.png';
import autumnIcon from './assets/autumn.png';

const categories = [
  { name: 'Culture', icon: cultureIcon, path: 'Cultureexample' },
  { name: 'Food', icon: foodIcon, path: 'Foodexample' },
  { name: 'Clothes', icon: clothesIcon, path: 'Clothesexample' },
  { name: 'Tips', icon: tipsIcon, path: 'Tipsexample' },
  { name: 'Student guilds', icon: guildsIcon, path: 'Guildexample' },
  { name: 'Public transport', icon: transportIcon, path: 'Transportexample' },
  { name: 'Student stories', icon: storiesIcon, path:'Winter' },
  { name: 'Housing', icon: housingIcon, path: 'Housingexample' },
];

const seasons = [
  { name: 'Winter', icon: winterIcon, path:'Winter' },
  { name: 'Spring', icon: springIcon, path:'Spring' },
  { name: 'Summer', icon: autumnIcon, path:'Summer' },
  { name: 'Autumn', icon: summerIcon, path:'Autumn'},
];

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [activeSeason, setActiveSeason] = useState('');
  const navigate = useNavigate();
  const handleCategoryClick = (categoryName,path) => {
    console.log(`Category clicked: ${categoryName}`);
    navigate(path)
  };

  const handleSeasonClick = (seasonName,path) => {
    setActiveSeason(seasonName);
    console.log(`Season clicked: ${seasonName}`);
    navigate(path)
  };

  const handleOverview = () => {
    navigate('/Overview'); 
  };

  const handleForum = () => {
    navigate('/Forum'); 
  };

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      console.log(viewportWidth); 
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const apiKey = 'SJNTJB4R4WBZDE5CPEMAY2YD3';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Helsinki?unitGroup=metric&key=${apiKey}&contentType=json`;

    async function fetchWeather() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        // Weather API
        setWeather(data.days[0].temp); 
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    }

    fetchWeather();
  }, []);

  return (
    <div className="App">
      <div className="home-wrapper">
        <div className="home-sidebar">
        <div class="text-container">
          <h1>International Student Guide Finland</h1>
          <p>Here to help you on every step</p>
          <div class="buttons-container">
            <button onClick={handleOverview}>Overview</button>
            <button onClick={handleForum}>Forum</button>
          </div>
        </div>
        </div>
        <div class="images-container">
          <div class="icon top-icon">
            <img src={NavIcon1} alt="Icon 1" className="icon"/>  
          </div>
          <div class="icon bottom-left-icon">
            <img src={NavIcon2} alt="Icon 2" className="icon"/>
          </div>
          <div class="icon bottom-right-icon">
            <img src={NavIcon3} alt="Icon 3" className="icon"/>
          </div>
        </div>
      </div>
      
      <section className="categories">
        {categories.map((category) => (
          <div key={category.name} className="category" onClick={() => handleCategoryClick(category.name, category.path)}>
            <img src={category.icon} alt={category.name} className="category-icon" />
          </div>
        ))}
      </section>

      <section className="current-temperature">
        <div className="temperature-info">
          <div>Current temperature in:</div>
          <div className="city-name">HELSINKI</div>
        </div>
        <div className="temperature-value">{weather ? <p>{weather}<span className="degree-symbol">°C</span></p> : <p>Loading weather data...</p>}</div>
      </section>

      <section className="seasons">
        <p className='seasons-text'>Still wondering what to pack for your stay in Finland? Here are some clothing pack lists per season!</p>
        <div className="seasons-container">
          {seasons.map((season) => (
            <div key={season.name} className={`season ${activeSeason === season.name ? 'active' : ''}`} onClick={() => handleSeasonClick(season.name, season.path)}>
              <img src={season.icon} alt={season.name} className="season-icon" />
              <span className='season-name'>{season.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
