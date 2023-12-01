import React from 'react';
import './App.css'; // 确保你有一个App.css的样式文件
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//import ScrollToTop from './ScrollToTop';

// 导入您的页面组件
import Home from './Home';
import Overview from './Overview/Overview';
import Forum from './Forum/Forum';
import Profile from './Profile';
import Settings from './Settings';
import Register from './Register';
import Login from './Login';
import Navbar from './Navbar';
import Share from './Share/Share';
import Cultureexample from './Forum/Cultureexample';
import Foodexample from './Forum/Foodexample';
import Tipsexample from './Forum/Tipsexample';
import Guildexample from './Forum/Guildexample';
import Transportexample from './Forum/Transportexample';
import Housingexample from './Forum/Housingexample';
import Clothesexample from './Forum/Clothesexample';
import Winter from './Forum/Winter';
import Spring from './Forum/Spring.js';
import Summer from './Forum/Summer';
import Autumn from './Forum/Autumn';

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
}

// 布局组件不包含Navbar
function AuthLayout({ children }) {
  return (
    <div>{children}</div>
  );
}

function App() {
  return (
    <Router>

        <Routes>
          <Route path="/overview" element={<MainLayout><Overview /></MainLayout>} />
          <Route path="/forum" element={<MainLayout><Forum /></MainLayout>} />
          <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
          <Route path="/cultureexample" element={<MainLayout><Cultureexample /></MainLayout>} />
          <Route path="/foodexample" element={<MainLayout><Foodexample /></MainLayout>} />
          <Route path="/tipsexample" element={<MainLayout><Tipsexample /></MainLayout>} />
          <Route path="/guildexample" element={<MainLayout><Guildexample /></MainLayout>} />
          <Route path="/transportexample" element={<MainLayout><Transportexample /></MainLayout>} />
          <Route path="/housingexample" element={<MainLayout><Housingexample /></MainLayout>} />
          <Route path="/clothesexample" element={<MainLayout><Clothesexample /></MainLayout>} />
          <Route path="/winter" element={<MainLayout><Winter /></MainLayout>} />
          <Route path="/spring" element={<MainLayout><Spring /></MainLayout>} />
          <Route path="/summer" element={<MainLayout><Summer /></MainLayout>} />
          <Route path="/autumn" element={<MainLayout><Autumn /></MainLayout>} />
          <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/share" element={<MainLayout><Share /></MainLayout>} />
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        </Routes>

    </Router>
  );
}

export default App;