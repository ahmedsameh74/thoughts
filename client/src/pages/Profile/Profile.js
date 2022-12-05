// import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useProfileContext } from "../../hooks/useProfileContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import './Profile.css'
import React from "react";
import Contact from "../contact/Contact";
import UserBlogs from "../userblogs/UserBlogs";


const Profile = () => {
    const {user} = useAuthContext()
    const {dispatch, profile} = useProfileContext()
    const [active, setActive] = useState(1);

    const handleActive = (index) => {
        setActive(index);
    }

    useEffect(() => {
        const fetchProfile = async () => {
            const res = await fetch(`/api/profiles/user/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const data = await res.json()
            if(!res.ok){
                console.log(data)
                return
            }
            if(res.ok){
                dispatch({type: 'GET_PROFILE', payload: data})
            }
        }
        if(user){
            fetchProfile()
        }
    },[user, dispatch])
    // console.log(profile, user)
    return (
      <div className="profile">
        {profile && (
          <img
            className="cover-pic"
            src={profile.coverPic}
            alt={profile.name}
          />
        )}
        {profile && (
          <img
            className="profile-pic"
            src={profile.profilePic}
            alt={profile.name}
          />
        )}
        {profile && (
          <div className="links">
            <button
              className={active === 1 ? "profile-link-active" : "profile-link"}
              // to={`/user/${profile.userName}`}
              onClick={() => handleActive(1)}
            >
              About
            </button>
            <button
              className={active === 2 ? "profile-link-active" : "profile-link"}
              // to="/contact"
              onClick={() => handleActive(2)}
            >
              Contact
            </button>
            <button
              className={active === 3 ? "profile-link-active" : "profile-link"}
              to={`/blogs/${profile.userName}`}
              onClick={() => handleActive(3)}
            >
              blogs
            </button>
          </div>
        )}
        <>
          {active === 1 && profile && (
            <h1 className="profile-username">{profile.userName}</h1>
          )}
          {active === 1 && profile && (
            <p className="profile-bio">{profile.bio}</p>
          )}
          {active === 1 && profile && (
            <p className="profile-email">{profile.email}</p>
          )}
          {active === 2 && profile && (
            <div className="user-contact">
              <Contact profile={profile} />
            </div>
          )}
          {active === 3 && profile && (
            <div className="user-blogs">
              <UserBlogs />
            </div>
          )}
        </>
      </div>
    );
}
 
export default Profile;