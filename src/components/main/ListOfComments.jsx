import {useContext, useEffect, useRef, useState} from "react";
import {getAllArticleComments} from "../../fetchData.js";
import Comment from "./Comment.jsx";
import {PostCommentStateContext} from "../../contexts/context.jsx";
import Error from "./Error.jsx";
import Lottie from "lottie-react";
import LoadingAnimation from "../../assets/images/Loading-Animation.json";

export default function ListOfComments({articleID}){
    const [comments, setComments] = useState([]);
    const isFishedLoading = useRef(false);
    const {isPostSuccess} = useContext(PostCommentStateContext);
    const [isEmptyContent, setIsEmptyContent] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);
    const [isBadRequest, setIsBadRequest] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isFishedLoading.current && isPostSuccess === false) return;
        getAllArticleComments(articleID).then(({data:{comments}})=>{
            setComments(comments);
            if(comments.length === 0){
                setIsEmptyContent(true);
            }
            setLoading(false);
            isFishedLoading.current = true;
        }).catch((err)=>{
            if(err.status === 404){
                setIsNotFound(true);
            }
            if(err.status === 400){
                setIsBadRequest(true);
            }
        })
    }, [comments,isPostSuccess]);

    if(isNotFound){
        return (<Error error={404} />);
    }

    if(isBadRequest){
        return (<Error error={400} />);
    }
    if(isEmptyContent){
        return (
            <div className="list-of-comments bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 font-bold text-2xl text-center gap-4 p-2 t">
                <p className="mt-52">No Comment Related To Article Has Been Found !</p>
            </div>
        )
    }
    if (loading) {
        return (
            <div className="fixed inset-0 z-50 bg-white">
                <div className="w-[1000px] h-[1000px] mt-[250px] ml-[20px] xl:ml-[650px] md:ml-[250px] lg:ml-[400px]">
                    <Lottie animationData={LoadingAnimation} loop={true} />
                </div>
            </div>
        )
    }
    return (
        <div className="list-of-comments bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 grid grid-cols-1 lg:grid-cols-2 gap-4 p-2">
            {comments.map((comment,index) => (
                <Comment key={index} comment={comment} />
            ))}
        </div>
    )
}