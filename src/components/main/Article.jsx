import {useParams} from "react-router";
import {getArticleById,patchArticleVotes} from "../../fetchData.js";
import {useEffect, useRef, useState} from "react";
import ListOfComments from "./ListOfComments.jsx";
import like from "../../assets/images/like-svg.svg"
import dislike from "../../assets/images/dislike-svg.svg"
import {useNetworkState} from "react-use";
import NewComment from "./NewComment.jsx";
import Error from "./Error.jsx";

export default function Article() {
    const [article, setArticle] = useState({});
    const {article_id} = useParams();
    const isFishedLoading = useRef(false);
    let createdAt = "";
    const [isLike, setIsLike] = useState(false);
    const [isDislike, setIsDislike] = useState(false);
    const [votesCount, setVotesCount] = useState(0);
    const networkState = useNetworkState();
    const [isEmptyContent, setIsEmptyContent] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);
    const [isBadRequest, setIsBadRequest] = useState(false);

    useEffect(() => {
        if (isFishedLoading.current) return;
        getArticleById(article_id).then(({data}) => {
            setArticle(data.article[0]);
            if(data.article.length === 0){
                setIsEmptyContent(true);
            }
            isFishedLoading.current = true;
        }).catch((err) => {
            if(err.status === 404){
                setIsNotFound(true);
            }
            if(err.status === 400){
                setIsBadRequest(true);
            }
        })
    }, [article_id,article,votesCount]);

    if(isFishedLoading.current){
        createdAt = article.created_at.slice(0, 10) + " " + article.created_at.slice(11, 19);
    }

    function likeVote(){
        if(networkState.online){
            setIsLike(true)
            setTimeout(()=>{
                setIsLike(false)
                patchArticleVotes(article_id,1).then(() => {
                    setVotesCount(votesCount+1)
                    isFishedLoading.current = false;
                }).catch((err) => {
                    if(err.status === 404){
                        setIsNotFound(true);
                    }
                    if(err.status === 400){
                        setIsBadRequest(true);
                    }
                })
            },1500)
        }
        else {
            setIsLike(true)
            setIsDislike(true);
            setTimeout(()=>{
                setIsLike(false)
                setIsDislike(false);
            },1500)
        }

    }
    function dislikeVote(){
        if(networkState.online){
            setIsDislike(true);
            setTimeout(()=>{
                setIsDislike(false)
                patchArticleVotes(article_id,-1).then(({data}) => {
                    setVotesCount(votesCount-1)
                    isFishedLoading.current = false;
                }).catch((err) => {
                    if(err.status === 404){
                        setIsNotFound(true);
                    }
                    if(err.status === 400){
                        setIsBadRequest(true);
                    }
                })
            },1500)
        }
       else{
            setIsLike(true)
            setIsDislike(true);
            setTimeout(()=>{
                setIsLike(false)
                setIsDislike(false);
            },1500)
        }
    }

    if(isEmptyContent){
        return (<Error error={0} />);
    }

    if(isNotFound){
        return (<Error error={404} />);
    }

    if(isBadRequest){
        return (<Error error={400} />);
    }

    if(isFishedLoading.current){
        createdAt = article.created_at.slice(0, 10) + " " + article.created_at.slice(11, 19);
    }
    return (
        <div className="article ml-8 md:flex justify-center mb-8">
            <div
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mr-5">
                <img className="rounded-t-lg" src={`${article.article_img_url}`} alt=""/>
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{article.title}</h5>
                    <p className="text-sm my-1 text-black dark:text-white font-bold">Topic : {article.topic}</p>
                    <div className="flex flex-row">
                        <p className="text-sm my-5 text-black dark:text-white font-bold">Author: {article.author}</p>
                        <p className="text-sm my-5 text-black dark:text-white ml-5 font-bold">Date : {createdAt}</p>
                    </div>
                    <article className="mb-3 font-normal text-gray-700 dark:text-white">{article.body}</article>
                    <p className="text-sm my-3 text-black dark:text-white font-bold">Current Votes : {article.votes}</p>
                </div>
                <div className="flex flex-row">
                    <span className={`font-bold ml-7 like ${!isLike ? "hidden" : ""}`} >+1</span>
                    <span className={`font-bold ${networkState.online ? "ml-22" : "ml-12"} dislike ${!isDislike ? "hidden" : ""}`}>-1</span>
                </div>
                <div className="flex flex-row">
                    <img className="mx-5 cursor-pointer" src={like} alt="article like button" onClick={likeVote}/>
                    <img className="mt-[4px] cursor-pointer" src={dislike} alt="article like button" onClick={dislikeVote}/>
                </div>
                <div className={`disconnect-error-message font-bold text-red-700 p-5 ${networkState.online ? "hidden" : ""}`}>
                    <p>You've lost connection,Your vote will not count until you're back online.</p>
                </div>
                <NewComment articleID={article_id}/>
            </div>
            <ListOfComments articleID={article_id}/>
        </div>
    )
}