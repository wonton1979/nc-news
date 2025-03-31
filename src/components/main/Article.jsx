import {useParams} from "react-router";
import {getArticleById} from "../../fetchData.js";
import {useEffect, useRef, useState} from "react";
import ListOfComments from "./ListOfComments.jsx";
import like from "../../assets/images/like-svg.svg"
import dislike from "../../assets/images/dislike-svg.svg"

export default function Article() {
    const [article, setArticle] = useState({});
    const {article_id} = useParams();
    const isFishedLoading = useRef(false);
    let createdAt = "";
    useEffect(() => {
        if (isFishedLoading.current) return;
        getArticleById(article_id).then(({data}) => {
            setArticle(data.article[0]);
            isFishedLoading.current = true;
        })
    }, [article_id,article]);
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
                    <img className="mx-5" src={like} alt="article like button"/>
                    <img className="mt-[4px]" src={dislike} alt="article like button"/>
                </div>
            </div>
            <ListOfComments articleID={article_id}/>
        </div>
    )
}