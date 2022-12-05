import React from "react";
import { useState } from "react";
// import { usePostContext } from "../../hooks/usePostContext";

const Comments = ({post}) => {
    const [comment, setComment] = useState("");
    const [email, setEmail] = useState("");
    // const {dispatch} = usePostContext()
    
    const [newPost, setNewPost] = useState(post);


    console.log(post)
    const handleComment = async (e) => {
        e.preventDefault();
        console.log(email, comment)
        setNewPost(post)
        if(!comment || !email) return;
        const res = await fetch(`/api/comments/${post._id}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email,comment}),
        })
        const data = await res.json();
        console.log(data)
        if(res.ok) {
            const result = await fetch(`/api/pposts/${post._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const newData = await result.json();
            if(result.ok) setNewPost(newData)

            // setComment(data)
            // dispatch({type: "ADD_COMMENT", payload: data})
            console.log(newPost)
        }
    }

    return (
      <div className="comments-con">
        <div className="container-fluid">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-1">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Leave a comment
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <button className="btn btn-primary" onClick={handleComment}>
            comment
          </button>
        </div>
        <div className="post-comments mt-2">
          {post &&
            newPost.comments.map((comment) => {
              return (
                <div
                  className="card bg-light bg-gradient mb-2"
                  key={Math.random()}
                >
                  <div className="card-header">
                    <p className="card-subtitle">{comment.email}</p>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{comment.text}</p>
                  </div>
                </div>
              );
            })}

          {/* <label>
            email
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
          </label>
          <textarea onChange={(e) => setComment(e.target.value)} /> */}
        </div>
      </div>
    );
}
 
export default Comments;