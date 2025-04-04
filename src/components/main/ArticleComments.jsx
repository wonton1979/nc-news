import Comment from "./Comment.jsx";
import {deleteComment} from "../../fetchData.js";
import {useRef, useState} from "react";

export default function ArticleComments({myComments,setRefresh,isFishedLoading}) {
    const createdAt = myComments.articleCreatedAt.slice(0, 10) + " " + myComments.articleCreatedAt.slice(11, 19);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [deletingCommentId, setDeletingCommentId] = useState(false);
    const buttonRef = useRef(null);
    const [yPos, setYPos] = useState(null);


    function handleDelete(event){
        event.preventDefault();
        setIsButtonClicked(true);
        const formData = new FormData(event.target);
        const commentId =formData.get("comment-id");
        setDeletingCommentId(commentId);
        if(buttonRef.current){
            const scrollY = window.scrollY;
            setYPos(event.target.getBoundingClientRect().top-200 + scrollY);
        }

    }
    function conformDelete(){
        deleteComment(deletingCommentId);
        isFishedLoading.current=false;
        setRefresh((prevState) => prevState +1);
        setIsButtonClicked(false);
    }
    function cancelDelete(){
        setIsButtonClicked(false);
    }

    return (
        <>
            <div className="article ml-8 md:flex justify-center mb-8 ">
                <div className="max-w-sm relative bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mr-5 w-full">
                    <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{myComments.articleTitle}</h5>
                        <p className="text-sm mt-3 text-black dark:text-white font-bold">Topic : {myComments.articleTopic}</p>
                        <div className="flex flex-row">
                            <p className="text-sm my-2 text-black dark:text-white font-bold mr-5">Author: {myComments.articleAuthor}</p>
                            <p className="text-sm my-2 text-black dark:text-white font-bold">Date: {createdAt}</p>
                        </div>
                        {myComments.articleMyComments.map((comment) => {
                            return (
                                <div key={comment.comment_id} className="my-5">
                                    <Comment comment={comment}  />
                                    <form onSubmit={handleDelete}>
                                        <input type="hidden" name="comment-id" value={comment.comment_id} />
                                        <button type="submit" ref={buttonRef} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                        focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-22 py-2.5 text-center
                         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2">Delete My Comment
                                        </button>
                                    </form>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className={`absolute w-screen h-screen z-20 top-0
                left-0 text-center bg-transparent ${isButtonClicked ? "" : "hidden"} `}>
                <div className={`absolute items-center justify-center text-white lg:left-1/3  mx-5`} style={{top:`${yPos}px`}}>
                    <div className="user-confirmation border-black border-2 p-5 rounded-lg bg-white">
                        <p className="text-black font-bold my-8">Are you sure you want to delete this comment ?</p>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                        focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-22 py-2.5 text-center
                         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2 mx-2" onClick={conformDelete}>Yes
                        </button>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                        focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-22 py-2.5 text-center
                         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2 mx-2" onClick={cancelDelete}>Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>

    )
}