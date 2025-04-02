import {useState} from "react";
import {PostCommentStateContext,UsernameContext,CurrentPageContext} from "./context.jsx";

export const PostCommentStateProvider = ({ children }) => {
    const [isPostSuccess, setIsPostSuccess] = useState(false);
    return (
        <PostCommentStateContext.Provider value={{isPostSuccess,setIsPostSuccess}}>
            {children}
        </PostCommentStateContext.Provider>
    );
};

export const UsernameProvider = ({ children }) => {
    const [defaultUsername, setDefaultUsername] = useState("cooljmessy");
    return (
        <UsernameContext.Provider value={{defaultUsername,setDefaultUsername}}>
            {children}
        </UsernameContext.Provider>
    );
};

export const CurrentPageProvider = ({ children }) => {
    const [activePage, setActivePage] = useState("home");
    return (
        <CurrentPageContext.Provider value={{activePage,setActivePage}}>
            {children}
        </CurrentPageContext.Provider>
    );
};