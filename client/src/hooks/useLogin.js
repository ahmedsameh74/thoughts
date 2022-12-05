import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "./useProfileContext";

export const useLogin = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const {dispatch: dispatchProfile} = useProfileContext()
  const navigate = useNavigate()

  const login = async (email, password) => {
    setLoading(true);
    setError("");

    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data);
      setError(data.message);
      setLoading(false);
      return;
    }
    if (res.ok) {
      console.log(data); 
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      setLoading(false);
      setError("");
      if(data.profile) {
        dispatchProfile({type: 'GET_PROFILE', payload: data.profile})
        navigate(`/profile/${data.profile.userName}`)
      }else{
        navigate("/profilesetting");
      }
    }
  };
  return { login, error, loading };
};
