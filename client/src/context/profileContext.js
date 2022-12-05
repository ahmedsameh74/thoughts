import { createContext, useReducer, useEffect } from "react";
import React from "react";


export const ProfileContext = createContext();

export const profileReducer = (state, action) => {
    switch (action.type) {
        case 'GET_PROFILE':
            return { ...state, profile: action.payload };
        case 'SET_PROFILE':
            return { ...state, profile: action.payload };
        // case 'GET_ONE_PROFILE':
        //     return { ...state, profile: action.payload };
        case 'LOGOUT':
            return { ...state, profile: null };
        default:
            return state;
    }
}

export const ProfileContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(profileReducer, {
        profile: null,
    })
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      const fetchProfile = async () => {
        const res = await fetch(`/api/profiles/user/${user.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        })
        const data = await res.json();
        if (user && res.ok) {
            console.log(data, 'profileContext')
          dispatch({ type: "GET_PROFILE", payload: data});
          const user = JSON.parse(localStorage.getItem("user"));
            user.profile = data;
            localStorage.setItem("user", JSON.stringify(user));
        //   localStorage.setItem("profile", JSON.stringify(data));
        }
      }
       user && fetchProfile()
    }, []);
    console.log('ProfileContext state: ', state);

    return (
        <ProfileContext.Provider value={{ ...state, dispatch}}>
            {children}
        </ProfileContext.Provider>
    )
}