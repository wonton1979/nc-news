import {useState} from "react";
import {PostCommentStateContext} from "./context.jsx";

export const PostCommentStateProvider = ({ children }) => {
    const [isPostSuccess, setIsPostSuccess] = useState(false);
    return (
        <PostCommentStateContext.Provider value={{isPostSuccess,setIsPostSuccess}}>
            {children}
        </PostCommentStateContext.Provider>
    );
};