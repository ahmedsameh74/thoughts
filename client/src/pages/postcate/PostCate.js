import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom'
import { useAuthContext } from "../../hooks/useAuthContext";
import { usePostContext } from './../../hooks/usePostContext';
import { useProfileContext } from './../../hooks/useProfileContext';
import './PostCate.css'

export default function PostCate() {
    const {category} = useParams()
    const { user, dispatch: dispatchUser } = useAuthContext();
    const {dispatch} = useProfileContext()
    const [posts, setPosts] = useState([])
    // const {dispatch: dispathPosts} = usePostContext() 
    const [follow, setFollow] = useState(null)
    // console.log(user)

    const handleFollow = async () => {
      if(!follow){
        console.log('follow', category)
        try {
            const res = await fetch(`/api/user/follow/${user.id}`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({category})
            })
            const data = await res.json()
            console.log(data)
            dispatch({type: 'SET_PROFILE', payload: data})
            //  const userProfile = JSON.parse(localStorage.getItem("user"));
             user.profile = data;
             localStorage.setItem("user", JSON.stringify(user));
             dispatchUser({type: 'LOGIN', payload: user})
            setFollow(true)
          } catch (error) {
            console.log(error)
          }}else {
            console.log('unfollow')
            try {
              const res = await fetch(`/api/user/unfollow/${user.id}`, {
                method: 'POST', 
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${user.token}`
                    },
                    body: JSON.stringify({category})
                  })
                  const data = await res.json()
                  console.log(data)
                  dispatch({type: 'LOGIN', payload: data})
                  //  const userProfile = JSON.parse(localStorage.getItem("user"));
                   user.profile = data;
                   localStorage.setItem("user", JSON.stringify(user));
                   dispatchUser({ type: "LOGIN", payload: user });
                setFollow(false)
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
      const fetchByCat = async () => {
        const res = await fetch(`/api/cat/${category}/category`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await res.json();
        if(res.ok) {
            console.log(data)
            setPosts(data)
            // dispathPosts({type: 'GET_POSTS', payload: data})

        }
      }
      fetchByCat()
    },[category])

    useEffect(() => {
      if (user ){
        if(user.profile) {
          user.profile.follow.includes(category) && setFollow(true)
        }
      }else {
        setFollow(false)
      }
    }, [user, category])

  return (
    <div className="container-fluid category">
      <div className="category-header">
        <div >
          <h2>{category}</h2>
        </div>
        <div >
          <button className="follow-btn" onClick={handleFollow}>{follow ? 'unfollow' : 'follow'}</button>
        </div>
      </div>
      {posts &&
            <div className="category-body" key={Math.random(100000)}>
        {posts.map((post) => {
          return (
            <Link
              className="category-card"
              to={`/post/${post._id}`}
              style={{ background: post.backgroundColor }}
            >
              <div className="category-card-header">
                <h3>{post.title}</h3>
              </div>
              <div className="category-card-body">
                <p style={{ color: post.fontColor }}>{post.body}</p>
              </div>
            </Link>
          );}
        )}
          </div>
        }
    </div>
  );
}
