import './Signup.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignup } from '../../hooks/useSignup';
import React from "react";
import PuffLoader from "react-spinners/ClipLoader";


const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [err, setErr] = useState('');
  // const [empty, setEmpty] = useState('');
  const {signup, error, loading} = useSignup();
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!firstName || !lastName || !email || !password || !confirmPassword) {
      // setErr('All fields are required');
      console.log('All fields are required');
      return
    }
    if(password !== confirmPassword) {
      // setErr('Passwords do not match');
      console.log('Passwords do not match');
      return
    }
    if(error) {
      // setErr(error);
      return
    }
    
    // setErr('');
    await signup(firstName, lastName, email, password);
    console.log('signup successful');
    navigate('/login');

  }


    return (
      <div className="container">
        {/* <div className="cont">
          <h1>Welcome To Thoughts</h1>
          <p>Have a story to tell?</p>
        </div> */}
        {loading && (
          <div className="loading">
            <PuffLoader color="#a2d2ff" loading={loading} size={150} />
          </div>
        )}
        <div className="form">
          <form className="signup" autoComplete="off" onSubmit={handleSubmit}>
            <h2>Thoughts</h2>
            <div className="signup-label">
              <label>First Name </label>
              <input
                type="text"
                // className={error ? "ierror" : ""}
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </div>
            <div className="signup-label">
              <label>Last Name </label>
              <input
                type="text"
                // className={error ? "ierror" : ""}
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
            <div className="signup-label">
              <label>Email </label>
              <input
                type="email"
                // className={error ? "ierror" : ""}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="signup-label">
              <label>Password </label>
              <input
                type="password"
                // className={error ? "ierror" : ""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="signup-label">
              <label>Confirm Password </label>
              <input
                type="password"
                // className={error ? "ierror" : ""}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button className="signup-btn" disabled={loading}>
              Signup
            </button>
            <Link className="signup-link" to="/login">
              Already have an account?
            </Link>
          </form>
        </div>
      </div>
    );
}
 
export default Signup;