import {useEffect, useRef, useState} from "react";
import {getAllArticleComments} from "../../fetchData.js";
import Comment from "./Comment.jsx";

export default function ListOfComments({articleID}){
    const [comments, setComments] = useState([]);
    const isFishedLoading = useRef(false);
    useEffect(() => {
        if (isFishedLoading.current) return;
        getAllArticleComments(articleID).then(({data:{comments}})=>{
            setComments(comments);
            isFishedLoading.current = true;
        })
    }, [comments]);
    return (
        <div className="list-of-comments bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 grid grid-cols-1 lg:grid-cols-2 gap-4 p-2">
            {comments.map((comment,index) => (
                <Comment key={index} comment={comment} />
            ))}
        </div>
    )
}