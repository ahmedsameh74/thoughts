import Nav from './components/nav/Nav';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import ProfileSetting from "./pages/user/User";
import { useAuthContext } from './hooks/useAuthContext';
import Create from './pages/create/Create';
import PostDetails from './components/postDetails/PostDetails';
import Profile from './pages/Profile/Profile';
import { useProfileContext } from './hooks/useProfileContext';
import UserProfile from './pages/userProfile/UserProfile';
import UserBlogs from './pages/userblogs/UserBlogs';
import Contact from './pages/contact/Contact';
import PostCate from './pages/postcate/PostCate';

//nn

function App() {
  const {user} = useAuthContext();
  const {profile} = useProfileContext();
  const [showNav, setShowNav] = useState(false);
  const App = useRef()

  useEffect(() => {
    showNav ? App.current.className = 'Approw' : App.current.className = 'Appcolumn'
  })


  console.log(profile)

  return (
    <div className="App" ref={App}>
      <BrowserRouter>
        {/* */}
        {user && <Nav showNav={showNav} setShowNav={setShowNav} />}
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          {user && <Route exact path="/create" element={<Create />} />}
          {user && <Route exact path="/post/:id" element={<PostDetails />} />}
          {profile && (
            <Route path="/profilesetting" element={<ProfileSetting />} />
          )}
          {user && <Route path="/profile/:username" element={<Profile />} />}
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route exact path="/contact/:username" element={<Contact />} />
          <Route exact path="/category/:category" element={<PostCate />} />
          <Route exact path="/user/:username" element={<UserProfile />} />
          <Route path="/blogs/:username" element={<UserBlogs />} />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
