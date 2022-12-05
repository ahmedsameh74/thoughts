import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import {usePostContext} from '../../hooks/usePostContext';
// import {useEffect} from 'react';
import './Home.css';
import Post from '../../components/Post/Post';
import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import { useProfileContext } from './../../hooks/useProfileContext';
// import Cat from '../../components/cat/Cat';
import Search from '../../components/Search/Search';
import PuffLoader from "react-spinners/ClipLoader";
// import { useState } from 'react';
// import { useEffect } from 'react';
// import Slider from "react-slick";


const Home = () => {
  const {user} = useAuthContext();
  // const {profile} = useProfileContext()
  const {posts, loading} = usePostContext();
  // const [loading, setLoading] = useState(false)
  // const [followed, setFollowed] = useState([])
  // console.log( user, posts)

  



  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };


  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await fetch('/api/posts', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${user.token}`
  //       }
  //     });
  //     const data = await res.json();
  //     if(res.ok && profile) {
  //       // console.log(data)
  //       const cat = data.map(post => post.categories.join(''))
  //       const followedCat = cat.filter(cat => profile.follow.includes(cat))
  //       // console.log(profile.follow)
  //       // console.log(cat)
  //       const followedPosts = data.filter(post => followedCat.includes(post.categories.join('')))
  //       // console.log( followedCat, followedPosts)
  //       // console.log(followedPosts.length)
  //       if(followedPosts.length > 0) {
  //         dispatch({ type: "GET_POSTS", payload: followedPosts });
          
  //         // setFollowed(followedPosts)
  //       } 
  //     }
  //   }
  //   if(user){
  //     fetchPosts()
  //   }
  // }, [dispatch, user, profile])

    return (
      <div className=" home">
        {loading ? (
          <div className="loading">
            <PuffLoader color="#a2d2ff" loading={loading} size={150} />
          </div>
        ): (
        <div className="home-header">
          {user && (
            <div className="header-title">
              <h2 className="text-3xl font-bold underline">
                welcome {user.firstName}
              </h2>
            </div>
          )}
          <div className="header-info">
            <div className="info-para">
              <p>Have a story to tell?</p>
            </div>
            <div className="info-btn">
              <Link className="create-btn" to="/create" role="button">
                Create
              </Link>
            </div>
          </div>
          <div className="posts-topics">
            <div className="posts-cat">
              <p>Or follow some topics</p>
            </div>
            {/* <Cat /> */}
          </div>

          <div className="search">
            <Search />
          </div>

          <div className="posts">
            {posts ? (
              posts.map((post) => <Post key={post._id} post={post} />)
            ) : (
              <div className="col">
                <h1 className="text-center">No posts</h1>
              </div>
            )}
          </div>

        </div>
        )}
      </div>
    );
    }
 
export default Home;