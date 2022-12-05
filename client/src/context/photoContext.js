import {  createContext, useReducer } from "react";

export const PhotoContext = createContext()

export const photoReducer = (state, action) => {
    switch(action.type){
        case 'SET_IMG':
            return {...state, image: [ action.payload]}
        case 'SET_PROFILE':
            return { ...state, profile: [ action.payload]}
        case 'SET_COVER':
            return {...state, cover: [ action.payload]}
        case 'CLEAR':
            return state = null
        default:
            return state

    }
    

}


export const PhotoContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(photoReducer, {
        image: null,
        profile: null,
        cover: null
    })

    console.log(state, 'photo context')

    return (
        <PhotoContext.Provider value={{...state, dispatch}}>
            {children}
        </PhotoContext.Provider>
    )

}