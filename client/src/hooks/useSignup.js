import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (firstName, lastName, email, password) => {
        setLoading(true);
        setError("");

        const res = await fetch("/api/users/signup", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ firstName, lastName, email, password })
        })
        const data = await res.json();
        if(!res.ok) {
            console.log(data)
            setError(data.message);
            setLoading(false);
            return
        }
        if(res.ok) {
            console.log(data);
            // localStorage.setItem("token", JSON.stringify(data.token));
            dispatch({ type: "SIGNUP", payload: data.user });
            setLoading(false);
            setError("");
        }
    }
    return { signup, error, loading };
}