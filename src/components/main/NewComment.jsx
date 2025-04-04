import {getAllUsers,postNewComment} from "../../fetchData.js";
import {useContext, useState} from "react";
import {PostCommentStateContext,UsernameContext} from "../../contexts/context.jsx";

export default function NewComment({articleID}) {
    const [comment, setComment] = useState("");
    const {isPostSuccess,setIsPostSuccess} = useContext(PostCommentStateContext);
    const [submitted, setSubmitted] = useState(false);
    const {defaultUsername} = useContext(UsernameContext);
    const [isCommentValid, setIsCommentValid] = useState(true);

    function insertNewComment(event) {
        event.preventDefault();

        if(comment.trim().length >= 50) {
            setIsCommentValid(true);
            getAllUsers().then(({data:{users}}) => {
                const matchedUsername = users.find((user) => user.username === defaultUsername);
                setSubmitted(true);
                if (matchedUsername) {
                    postNewComment(articleID,defaultUsername,comment)
                    setComment("")
                    setIsPostSuccess(true);
                    setTimeout(() => {
                        setIsPostSuccess(false);
                        setSubmitted(false);
                    },3800)
                }
                else{
                    setIsPostSuccess(false);
                }
            })
        }
        else {
            setIsCommentValid(false);
        }

    }
    return (
        <div className="form-wrapper my-5 mx-5 ">
            <form onSubmit={insertNewComment} className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input type="text" value={defaultUsername} id="username" className="shadow-xs bg-gray-50 border border-gray-300
                             text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                             w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                             dark:shadow-xs-light" disabled={true}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="password"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                        Comment</label>
                    <textarea id="comment-body" className="shadow-xs bg-gray-50 border border-gray-300
                             text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                             w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light
                             "value={comment}
                              onChange={(event)=>{setComment(event.target.value)}} />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                        focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post My Comment
                </button>
            </form>
            <div className={`success-message my-5 text-green-700 font-bold dark:text-white ${isPostSuccess ? "" : "hidden"}`}>
                <p>Your comment has been posted successfully, it will appear at top beside this article.</p>
            </div>
            <div className={`username-error my-5 text-red-700 dark:text-white ${ isCommentValid ? "hidden" : ""}`}>
                <p>Comment Must Be At Least 50 Characters Long.</p>
            </div>
        </div>
    )
}