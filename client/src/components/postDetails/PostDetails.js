import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { usePostContext } from "../../hooks/usePostContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import './PostDetails.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import React from 'react'
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import Comments from "./Comments";
import PuffLoader  from 'react-spinners/ClipLoader';
import { motion } from 'framer-motion';

const PostDetails = () => {
    const {id} = useParams();
    const {dispatch} = usePostContext()
    const {user} = useAuthContext();
    const [perm, setPerm] = useState(false);
    const [post, setPost] = useState(null);
    const [update, setUpdate] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [share, setShare] = useState(false);

    // console.log(post);

    const deletePost = async () => {
        try {
            const res = await fetch("/api/posts/" +post._id, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              }
            });
            // await axios.delete(pp + post.photo, {
            //     data: {photo: post.photo}
            // });
            const data = await res.json();
            if (res.ok) {
              dispatch({ type: "DELETE_POST", payload: data });
              navigate("/");
            }
        }catch(error) {
            console.log(error)
        }
    }

    const editPost = async () => {
      console.log('edit')
        try {
          const res = await fetch(`/api/posts/${post._id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({title: title ? title : post.title, body: body? body : post.body}),
        })
        // const data = await res.json();
        if(!res.ok)(
          console.log('error')
        )
        if(res.ok) {
            const result = await fetch(`/api/posts/${post._id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            });
            const updatedData = await result.json();
            setPost(updatedData)
            setUpdate(false)
        }}catch(err){
          console.log(err)
        }
    }

    useEffect(() => {
      setLoading(true)
        const getPost = async () => {
            const res = await fetch(`/api/pposts/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await res.json();
            if(res.ok) {
                // dispatch({ type: "GET_POST", payload: data });
                // console.log(data)
                setPost(data);
                setLoading(false)
                if (user.id === data.userId) {
                  setPerm(true);
                } else {
                  setPerm(false);
                }
              }
        }
        if(user){
            getPost()
        }
    },[id, dispatch, user])

    return (
      <div
        className="singlePost"
      >
        {loading ? (
          <div className="loading">
            <PuffLoader color="#00BFFF" loading={loading} size={150} />
          </div>
        ) : (
          <div className="row">
            {post && (
              <div
                className="single-card d-flex flex-column"
                style={{ background: post.backgroundColor }}
              >
                <img
                  className="img-fluid rounded w-100 h-25 p-2"
                  src={post.photo}
                  alt={post.title}
                  style={{ height: "315px" }}
                />
                {post.categories &&
                  post.categories.map((cat) => (
                    <Link
                      to={`/category/${cat}`}
                      key={Math.random(100000)}
                      className="post-cat-btn"
                      role="button"
                    >
                      {cat}
                    </Link>
                  ))}
                {update ? (
                  <div className="input-group mb-3 mt-3">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      Title
                    </span>
                    <input
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                ) : (
                  <h1 className="text-center">{post.title}</h1>
                )}
                <hr />
                <div className="post-info">
                  {perm && (
                    <div className="post-icons">
                      <span
                        className="material-symbols-outlined"
                        onClick={deletePost}
                        role="button"
                      >
                        delete
                      </span>
                      <span
                        className="material-symbols-outlined"
                        onClick={() => setUpdate(true)}
                        role="button"
                      >
                        edit
                      </span>
                    </div>
                  )}
                  <span>
                    {formatDistanceToNow(new Date(post.updatedAt), {
                      addSuffix: true,
                    })}
                  </span>
                  <Link to={`/user/${post.author}`} className="post-author">
                    {post.author}
                  </Link>
                  <div className="share-btn">
                    <span
                      className="material-symbols-outlined share-btn"
                      onClick={() => setShare(!share)}
                    >
                      share
                    </span>

                    {share && (
                      <motion.div
                        className="share"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <FacebookShareButton
                          url={window.location.href}
                          quote={post.title}
                          hashtag="#react"
                        >
                          <FacebookIcon size={22} round={true} />
                        </FacebookShareButton>
                        <TwitterShareButton
                          url={window.location.href}
                          title={post.title}
                          hashtags={["react", "blog"]}
                        >
                          <TwitterIcon size={22} round={true} />
                        </TwitterShareButton>
                        <EmailShareButton
                          url={window.location.href}
                          subject={post.title}
                          body={post.body}
                        >
                          <EmailIcon size={22} round={true} />
                        </EmailShareButton>
                        <LinkedinShareButton
                          url={window.location.href}
                          title={post.title}
                          summary={post.body}
                        >
                          <LinkedinIcon size={22} round={true} />
                        </LinkedinShareButton>
                        <WhatsappShareButton
                          url={window.location.href}
                          title={post.title}
                        >
                          <WhatsappIcon size={22} round={true} />
                        </WhatsappShareButton>
                      </motion.div>
                    )}
                  </div>
                </div>

                {update ? (
                  <div className="form-floating mt-3">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="floatingTextarea2"
                      style={{ height: "100px" }}
                      onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                    <label htmlFor="floatingTextarea2">blog</label>
                  </div>
                ) : (
                  <>
                    <p
                      className="post-body mt-3 mb-3"
                      style={{ fontSize: post.fontSize, color: post.fontColor }}
                    >
                      {post.body}
                    </p>
                    <hr />
                    <Comments post={post} />
                  </>
                )}
                {update && (
                  <div className="btns">
                    <button className="btn btn-success ms-2" onClick={editPost}>
                      Update
                    </button>
                    <button
                      className="btn btn-warning ms-2"
                      onClick={() => setUpdate(false)}
                    >
                      cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
}
 
export default PostDetails;