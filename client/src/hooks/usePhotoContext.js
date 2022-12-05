import { useContext } from "react";
import { PhotoContext } from "../context/photoContext";

export const usePhotoContext = () => {
    const context = useContext(PhotoContext)
    if(!context) throw new Error("usePhotoContext must be used within PhotoContextProvider");
    return context
}