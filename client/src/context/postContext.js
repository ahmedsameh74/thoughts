import { createContext, useEffect, useReducer, useState } from "react";
import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
// import { useProfileContext } from "../hooks/useProfileContext";

export const PostContext = createContext();
export const postReducer = (state, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return { posts: action.payload };
    case "CREATE_POST":
      return { posts: [...state.posts, action.payload] };
    // case 'UPDATE_POST':
    //     return { posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post) };
    case "DELETE_POST":
      return {
        posts: state.posts.filter((post) => post._id !== action.payload._id),
      };
    case "ADD_COMMENT":
      return {
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case "LOGOUT":
      return { posts: null };
    default:
      return state;
  }
};

export const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, {
    posts: null,
    // loading: false,
    // error: null,
  });
  const [loading, setLoading] = useState(false);

  const {user} = useAuthContext()
  // let userProfile = JSON.parse(localStorage.getItem("user"));
  // let profile = userProfile.profile;
  console.log("post context", user);
  
  useEffect(() => {
    setLoading(true);
      const fetchPosts = async () => {
     const res = await fetch(`/api/posts/allposts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });
    const data = await res.json();
    console.log('postContext', data)
    if(user) {
      // console.log(data)
      if(user.profile) {
        if(user.profile.follow){
          const cat = data.map((post) => post.categories.join(""));
          console.log(user.profile);
          let followedCat = cat.filter((cat) =>
            user.profile.follow.includes(cat)
          );
          // console.log(profile.follow)
          // console.log(cat)
          const followedPosts = data.filter((post) =>
            followedCat.includes(post.categories.join(""))
          );
          console.log(followedPosts);
          // console.log( followedCat, followedPosts)
          // console.log(followedPosts.length)
          if (followedPosts.length > 0) {
            dispatch({ type: "GET_POSTS", payload: followedPosts });
            setLoading(false);
            // setFollowed(followedPosts)
          } else {
            dispatch({ type: "GET_POSTS", payload: null });
            setLoading(false);
          }
      }
      }
    }
    }
    if(user){
      fetchPosts()
    }
  }, [user, dispatch]);



  return (
    <PostContext.Provider value={{ ...state, dispatch, loading }}>
      {children}
    </PostContext.Provider>
  );
};
