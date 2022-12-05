import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useProfileContext } from "../../hooks/useProfileContext";
// import axios from "axios";
import React from "react";
import { usePhotoContext } from "../../hooks/usePhotoContext";
import Modal from "../../components/modal/Modal";
import Croper from "../../components/Croper";
import './User.css'



const ProfileSetting = () => {
    const {user} = useAuthContext()
    const {profile: checkProfile, dispatch} = useProfileContext()
    const [userName, setUserName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [userBio, setUserBio] = useState('');
    const [coverPic, setCoverPic] = useState('');
    const navigate = useNavigate()
    const {profile, cover} = usePhotoContext()
    const [showModal, setShowModal] = useState(false);
    const imgco = { width: 800, height: 315 };
    const imgpro = { width: 150, height: 150 };
    const proDispatch = { type: "SET_PROFILE", payload: '' };
    const covDispatch = { type: "SET_COVER", payload: '' };
    const [err, setErr] = useState(null)
    console.log(checkProfile);

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         const res = await fetch(`/api/posts`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${user.token}`
    //             }
    //         });
    //         const data = await res.json();
    //         console.log(data)
    //         if(res.ok) {
    //             dispatchPost({ type: "GET_POSTS", payload: data });
    //         }
    //     }
    //     if(user){
    //         fetchPosts()
    //     }

    // },[dispatchPost, profile, user])
    const handleModal = (e) => {
      document.body.onfocus = () => {
        if(e.target.files.length <= 0){
          console.log(e.target.files);
          setShowModal(false);
        }
      }
    }


    const handlePhoto = (e) => {
      
      if (e.target.files && e.target.files.length > 0) {
        setShowModal(true);
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.addEventListener("load", () => {
          // dispatchImg({type: 'SET_IMAGE', payload: reader.result})
          setProfilePic(reader.result);
          e.target.value = null;
          // console.log(reader.result)
        });
      }
    };

    const handleCover = (e) => {
      
      if (e.target.files && e.target.files.length > 0) {
        // console.log(e)
        setShowModal(true);
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.addEventListener("load", () => {
          setCoverPic(reader.result);
          setProfilePic(null)
          e.target.value = null;
        });
      }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(checkProfile){
          const userProfile = { userName: userName ? userName : checkProfile.userName, bio: userBio ? userBio : checkProfile.bio };
          if (profile) {
            // const imgData = new FormData();
            try {
              const formdata = new FormData();
              // formdata.append("croppedImage", image[0]);
              console.log(profile[0].name);
              const fileName = Date.now() + profile[0].name;
              formdata.append("name", fileName);
              formdata.append("file", profile[0]);

              console.log(profile[0]);
              // console.log(imgData);
              // await axios.post("/api/uploads", image[0].formdata);
              const res = await fetch("/api/uploads/profilephoto", {
                method: "POST",
                body: formdata,
              });
              const data = await res.json();
              console.log(data);
              userProfile.profilePic = data.secure_url;
              userProfile.cloudinary_id = data.public_id;
            } catch (error) {
              setErr(error.message);
              console.log(error);
            }
          }
          if (cover) {
            // const imgData = new FormData();
            try {
              const formdata = new FormData();
              // formdata.append("croppedImage", image[0]);
              console.log(cover[0].name);
              const fileName = Date.now() + cover[0].name;
              formdata.append("name", fileName);
              formdata.append("file", cover[0]);

              console.log(cover[0]);
              // console.log(imgData);
              // await axios.post("/api/uploads", image[0].formdata);
              const res = await fetch("/api/uploads/coverphoto", {
                method: "POST",
                body: formdata,
              });
              const data = await res.json();
              console.log(data);
              userProfile.coverPic = data.secure_url;
              userProfile.cloudinaryCov_id = data.public_id;
            } catch (error) {
              setErr(error.message);
              console.log(error);
            }
          }

          console.log(userProfile);

          const res = await fetch(`/api/profiles/user/${checkProfile._id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(userProfile),
          });
          const data = await res.json();
          console.log(data);
          if (!res.ok) {
            console.log(data);
            setErr(data.message);
            return;
          }
          if (res.ok) {
            const user = JSON.parse(localStorage.getItem("user"));
            user.profile = data;
            localStorage.setItem("user", JSON.stringify(user));
            dispatch({ type: "SET_PROFILE", payload: data });
            navigate("/");
          }
        }

        if(!userName && !userBio && !profilePic && !coverPic){
            setErr('Please fill atleast one field')
            return
        }
        // console.log(user)
        
        if(!checkProfile) {
          setErr(null);
          const userProfile = { userName, bio: userBio };
          if (profile) {
            // const imgData = new FormData();
            try {
              const formdata = new FormData();
              // formdata.append("croppedImage", image[0]);
              console.log(profile[0].name);
              const fileName = Date.now() + profile[0].name;
              formdata.append("name", fileName);
              formdata.append("file", profile[0]);

              console.log(profile[0]);
              // console.log(imgData);
              // await axios.post("/api/uploads", image[0].formdata);
              const res = await fetch("/api/uploads/profilephoto", {
                method: "POST",
                body: formdata,
              });
              const data = await res.json();
              console.log(data);
              userProfile.profilePic = data.secure_url;
              userProfile.cloudinary_id = data.public_id;
            } catch (error) {
              setErr(error.message);
              console.log(error);
            }
          }
          if (cover) {
            // const imgData = new FormData();
            try {
              const formdata = new FormData();
              // formdata.append("croppedImage", image[0]);
              console.log(cover[0].name);
              const fileName = Date.now() + cover[0].name;
              formdata.append("name", fileName);
              formdata.append("file", cover[0]);

              console.log(cover[0]);
              // console.log(imgData);
              // await axios.post("/api/uploads", image[0].formdata);
              const res = await fetch("/api/uploads/coverphoto", {
                method: "POST",
                body: formdata,
              });
              const data = await res.json();
              console.log(data);
              userProfile.coverPic = data.secure_url;
              userProfile.cloudinaryCov_id = data.public_id;
            } catch (error) {
              setErr(error.message);
              console.log(error);
            }
          }
          const res = await fetch(`/api/profiles/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(userProfile),
          });
          const data = await res.json();
          console.log(data);
          if (!res.ok) {
            console.log(data);
            setErr(data.message);
            return;
          }
          if (res.ok) {
            const user = JSON.parse(localStorage.getItem("user"));
            user.profile = data;
            localStorage.setItem("user", JSON.stringify(user));
            dispatch({ type: "SET_PROFILE", payload: data });
            navigate("/");
          }
        }
        
        // dispatch({ type: "SET_PROFILE", payload: data });

    }

    return (
      <div className="user" onSubmit={handleSubmit}>
        <form className="user-form">
          <h2>setup your profile</h2>
          <div className="pro-label">
            <label>User Name</label>
            <input type="text" onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className="pro-label">
            <label>profile pic</label>
            <label htmlFor="profile" className="pro-field">
              <span className="material-symbols-outlined pro-field">upload</span>
            </label>
            <input
              type="file"
              id="profile"
              onChange={handlePhoto}
              onClick={handleModal}
              style={{ display: "none" }}
            />
          </div>
          <div className="pro-label">
            <label>bio</label>
            <input type="text" onChange={(e) => setUserBio(e.target.value)} />
          </div>
          <div className="pro-label">
            <label>cover pic</label>
            <label htmlFor="cover" className="cov-field">
              <span className="material-symbols-outlined pro-field">upload</span>
            </label>
            <input
              type="file"
              id="cover"
              onChange={handleCover}
              onClick={handleModal}
              style={{ display: "none" }}
            />
          </div>
          <button className="pro-btn">{checkProfile ? 'Update' : 'Set'}</button>
          {err && <p className="error">{err}</p>}
        </form>
        {showModal && (
          <Modal>
            {profilePic && (
              <Croper
                photo={profilePic}
                img={imgpro}
                cropShape={"round"}
                setModal={setShowModal}
                dispatchImg={proDispatch}
              />
            )}
            {coverPic && (
              <Croper
                photo={coverPic}
                cropShape={"react"}
                img={imgco}
                setModal={setShowModal}
                dispatchImg={covDispatch}
              />
            )}
          </Modal>
        )}
      </div>
    );
}
 
export default ProfileSetting;