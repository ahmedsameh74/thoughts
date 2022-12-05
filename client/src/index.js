import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { AuthContextProvider } from './context/authContext';
import { PostContextProvider } from './context/postContext';
import { ProfileContextProvider } from './context/profileContext';
import { PhotoContextProvider } from './context/photoContext';
// import "~slick-carousel/slick/slick.css"; 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <PostContextProvider>
    <ProfileContextProvider>
    <PhotoContextProvider>
      <App />
    </PhotoContextProvider>
    </ProfileContextProvider>
    </PostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

