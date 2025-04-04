import {useContext, useEffect, useRef, useState} from "react";
import {getAllArticles,getAllArticleComments} from "../../fetchData.js";
import Lottie from "lottie-react";
import LoadingAnimation from "../../assets/images/Loading-Animation.json";
import {CurrentPageContext,UsernameContext} from "../../contexts/context.jsx";
import ArticleComments from "./ArticleComments.jsx";
import Error from "./Error.jsx";

export default function ViewMyComments() {
    const [loading, setLoading] = useState(true);
    const {setActivePage} = useContext(CurrentPageContext);
    const [myComments, setMyComments] = useState([]);
    const {defaultUsername} = useContext(UsernameContext);
    const isFishedLoading = useRef(false);
    const [refresh, setRefresh] = useState(0);
    const [isNotFound, setIsNotFound] = useState(false);
    const [isBadRequest, setIsBadRequest] = useState(false);


    useEffect(() => {
        if (isFishedLoading.current) return;
        setMyComments([])
        setActivePage("my comments");
        getAllArticles().then(({data:{articles}}) => {
            articles.forEach(article => {
                const articleId = article.article_id;
                const articleAuthor = article.author;
                const articleTopic = article.topic;
                const articleTitle = article.title;
                const articleCreatedAt = article.created_at;
                const articleMyComments = []
                getAllArticleComments(article.article_id).then(({data:{comments}}) => {
                    comments.forEach((comment) => {
                        if(comment.author === defaultUsername){
                            articleMyComments.push(comment);
                        }
                    })
                    if(articleMyComments.length > 0){
                        setMyComments((prevComments) => [...prevComments,
                            {articleId:articleId, articleAuthor:articleAuthor,articleTopic:articleTopic,
                                articleTitle:articleTitle,articleMyComments:articleMyComments,articleCreatedAt:articleCreatedAt}]);
                    }
                })

            })
            setLoading(false);
            isFishedLoading.current = true;
        }).catch(err => {
            if(err.status === 404){
                setIsNotFound(true);
            }
            if(err.status === 400){
                setIsBadRequest(true);
            }
        })
    }, [refresh]);


    if(isNotFound){
        return (<Error error={404} />);
    }

    if(isBadRequest){
        return (<Error error={400} />);
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
    else {
        return (
            <div className="my-comments-list grid sm:grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mr-3">
                {myComments.map((article,index) =>
                   (<ArticleComments key={index} myComments={article} setRefresh={setRefresh} isFishedLoading={isFishedLoading} />)
                )}
            </div>
        )
    }

    if(isFishedLoading.current){
        if(myComments.length === 0){
            return (
                <div className="list-of-comments bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 font-bold text-2xl text-center gap-4 p-2 t">
                    <p className="mt-52">Sorry, But you haven't left any comments for articles !</p>
                </div>
            )
        }
    }


}