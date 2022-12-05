import { useContext } from "react";
import { PostContext } from './../context/postContext';

export const usePostContext = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error("useAuthContext must be used within AuthContextProvider");
    }
    return context;
}