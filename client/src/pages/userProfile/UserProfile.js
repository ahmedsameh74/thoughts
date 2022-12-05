import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import React from "react";
import Contact from "../contact/Contact";
import UserBlogs from "../userblogs/UserBlogs";


const UserProfile = () => {
    const userName = useParams()
    const {user} = useAuthContext()
    // const pp = "http://localhost:8000/images";
    const [profile, setProfile] = useState(null)
    const [active, setActive] = useState(1);

    const handleActive = (index) => {
      setActive(index);
    };

    console.log(userName.username)
    console.log(user)
    useEffect(() => {
        const fetchOneProfile = async () => {
            // const imges = await axios()
            const res = await fetch(`/api/user/profile/${userName.username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            // console.log(res)
            const data = await res.json()
            // console.log(data)
            if(!res.ok){
                console.log(data)
                return
            }
            if(res.ok){
                // dispatch({ type: "GET_ONE_PROFILE", payload: data });
                setProfile(data)
                console.log(data)
            }
        }
        fetchOneProfile()
    },[ userName.username])
    console.log(profile)

    return (
      // <div className="user-profile">
      //     {profile && <img className="cover-pic" src={pp + '/' +profile.coverPic} alt="" />}
      //     {profile && <img className="profile-pic" src={pp + '/' +profile.profilePic} alt="" />}
      //     <Link to={`/blogs/${userName.username}`}>blogs</Link>
      //     {profile && <h1>{profile.userName}</h1>}
      //     {profile && <p>{profile.bio}</p>}
      //     {profile && <p>{profile.email}</p>}

      // </div>
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
              // to={`/blogs/${profile.userName}`}
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
              <UserBlogs/>
            </div>
          )}
        </>
      </div>
    );
}
 
export default UserProfile;