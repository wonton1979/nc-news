import {getAllArticles} from "../../fetchData.js";
import {useContext, useEffect, useState} from "react";
import ArticleSummary from "./ArticleSummary.jsx";
import Lottie from "lottie-react";
import LoadingAnimation from "../../assets/images/Loading-Animation.json";
import {getArticlesByPage} from "../../fetchData.js";
import {CurrentPageContext} from "../../contexts/context.jsx";

export default function ListOfArticles() {
    const [articleList, setArticleList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const {setActivePage} = useContext(CurrentPageContext);
    useEffect(() => {
        setActivePage("home");
        getAllArticles().then(({data:{articles}}) => {
            setPages(Math.ceil(articles.length/8));
            getArticlesByPage(1).then(({data:{articles}}) => {
                setArticleList(articles);
            });
            setLoading(false);
            })
    }, [pages]);
    if (loading) {
       return (
           <div className="fixed inset-0 z-50 bg-white">
               <div className="w-[1000px] h-[1000px] mt-[250px] ml-[20px] xl:ml-[650px] md:ml-[250px] lg:ml-[400px]">
                   <Lottie animationData={LoadingAnimation} loop={true} />
               </div>
           </div>
       )
    }
    else{
        const pageNumbers= []
        for(let i=1;i<=pages;i++){
            pageNumbers.push(i);
        }
        function fetchArticlesByPage(event){
            const pageClicked = parseInt((event.currentTarget.textContent));
            getArticlesByPage(pageClicked).then(({data:{articles}}) => {
                setArticleList(articles);
                setCurrentPage(pageClicked);
            });
        }
        return (
            <>
                <div className="list-of-articles grid sm:grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mr-3">
                    {articleList.map((article) => (
                        <ArticleSummary key={article.article_id} article={article} />
                    ))
                    }
                </div>
                <div className={`pagination-bar flex justify-center mt-8`}>
                    <ul className="pagination flex flex-wrap justify-center items-center">
                        {pageNumbers.map((pageNumber) => (
                            <li key={pageNumber} className={`font-bold text-1xl 
                            ${currentPage===pageNumber ? 'bg-black text-white':""} border-black border-2 mx-3 
                            rounded-md px-8 py-2 cursor-pointer mt-3`} onClick={fetchArticlesByPage}>{pageNumber}</li>
                        ))}
                    </ul>
                </div>
            </>
        )
    }

}