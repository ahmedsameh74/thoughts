import { Link } from "react-router-dom";
import React from "react";
import './Post.css';
import formatDistanceToNow from "date-fns/formatDistanceToNow";
// import {Container, Row, Col} from 'react-bootstrap';

const Post = ({post}) => {
    // console.log(post)
    // const pp = 'http://localhost:8000/images';

    return (
      <Link className="post-card" to={`/post/${post._id}`}>
        {post.photo && (
          <img
            className="post-img"
            style={{ height: "100px" }}
            src={post.photo}
            alt=""
          />
        )}
        <div className="post-body">
          <h5 className="post-title">{post.title}</h5>
          <h6 className="post-subtitle">
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </h6>
          <div className="post-desc">{post.body.slice(0, 20) + "..."}</div>
        </div>
        {/* <p>{post.title}</p> */}
        {/* <hr /> */}
        <span></span>
        {/* <p>{post.body.slice(0, 20) + "..."}</p> */}
      </Link>
      // </div>
    );
}
 
export default Post;
