import { useAuthContext } from "./useAuthContext";
import { useProfileContext } from "./useProfileContext";
import { useNavigate } from "react-router-dom";
import { usePostContext } from "./usePostContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const {dispatch: dispatchProfile} = useProfileContext();
    const {dispatch: dispatchPost} = usePostContext();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        dispatch({ type: "LOGOUT" });
        dispatchProfile({type: "LOGOUT"});
        dispatchPost({type: "LOGOUT"});
        navigate("/login");
    }
    return { logout };
}