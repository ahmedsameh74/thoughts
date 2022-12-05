import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import React from "react";
import './UserBlogs.css'
import  PuffLoader  from 'react-spinners/ClipLoader';

const UserBlogs = () => {
    const [post, setPost] = useState(null);
    const {username} = useParams();
    const [loading, setLoading] = useState(false);
    console.log(post)

    useEffect(() => {
      setLoading(true);
        const getUserPosts = async () => {
            const res = await fetch(`/api/user/blogs/${username}`)
            const data = await res.json()
            if(!res.ok){
              setLoading(false);
                console.log(data)
                return
            }
            if(res.ok){
              setLoading(false);
                setPost(data)
                console.log(data)
            }
        }
        getUserPosts()
    }, [username])

    return (
      <div className="user-blogs container-fluid">
        <h3>{username} blogs</h3>
        {loading ? (
          <div className="loading">
            <PuffLoader color="#a2d2ff" loading={loading} size={100} />
          </div>
        ) : (
          <div className="blogs">
            {post && post.length > 0 ? (
              post.map((post) => (
                <Link
                  className="single-blog"
                  key={post._id}
                  to={`/post/${post._id}`}
                  style={{ background: post.backgroundColor }}
                >
                  <p className="single-blog-title">
                    {post.title}
                  </p>
                  <p className="text-secondary">
                    {post.body.slice(0, 5) + "..."}
                  </p>
                </Link>
              ))
            ) : (
              <p>This user doesn't have blogs</p>
            )}
          </div>
        )}
      </div>
    );
}
 
export default UserBlogs;