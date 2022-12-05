import "./Login.css";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { useState } from "react";
import React from "react";
import PuffLoader from "react-spinners/ClipLoader";
// import { useProfileContext } from "../../hooks/useProfileContext";
// import { useAuthContext } from "../../hooks/useAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading } = useLogin();
  
  // const { dispatch } = useProfileContext();
  // const [user, setUser] = useState("");
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      // setErr('All fields are required');
      console.log("All fields are required");
      return;
    }
    if (error) {
      // setErr(error);
      return;
    }
    await login(email, password);
    // dispatch({type: 'GET_PROFILE'})
    // console.log(user)
    // const res = await fetch(`/api/profiles/user/${user.id}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${user.token}`,
    //   },
    // })
    // const data = await res.json();
    // console.log(data)
    // console.log('login successful');
    // navigate("/profilesetting");
  }
  return (
    <div className="container-fluid">
      {/* <div className="cont">
        <h1>Welcome To Thoughts</h1>
        <p>Have a story to tell?</p>
      </div> */}
      {loading && (
        <div className="loading">
          <PuffLoader color="#a2d2ff" loading={loading} size={150} />
        </div>
      )}
      <div className="form" onSubmit={handleSubmit}>
        <form className="login" autoComplete="off">
          <h2>Thoughts</h2>
          <div className="label">
            <label>Email </label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="label">
            <label>Password </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button className="login-btn" disabled={loading}>
            Login
          </button>
          <Link className="login-link" to="/signup">
            Don't have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
