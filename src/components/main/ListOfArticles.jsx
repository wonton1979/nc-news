import {
    getAllArticles,
    getArticlesByPage,
    getArticlesSortBy,
    getArticlesSortByByPage,
} from "../../fetchData.js";
import {useContext, useEffect, useState} from "react";
import ArticleSummary from "./ArticleSummary.jsx";
import Lottie from "lottie-react";
import LoadingAnimation from "../../assets/images/Loading-Animation.json";
import {CurrentPageContext} from "../../contexts/context.jsx";
import Error from "./Error.jsx";

export default function ListOfArticles() {
    const [articleList, setArticleList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const {setActivePage} = useContext(CurrentPageContext);
    const [filterButtonClickCount, setFilterButtonClickCount] = useState(0);
    const [orderButtonClickCount, setOrderButtonClickCount] = useState(0);
    const [filterSelected, setFilterSelected] = useState("");
    const [filterSearchPath, setFilterSearchPath] = useState("");
    const [orderBy, setOrderBy] = useState("DESC");
    const [isNotFound, setIsNotFound] = useState(false);
    const [isBadRequest, setIsBadRequest] = useState(false);
    const [isEmptyContent, setIsEmptyContent] = useState(false);

    function handleFilterButton(){
        setFilterButtonClickCount(filterButtonClickCount + 1);
    }

    function handleOrderButton(){
        setOrderButtonClickCount(orderButtonClickCount + 1);
    }

    function handleFilterSelection(event){
        setFilterSelected(event.target.value);
    }

    function handleOrderSelection(event){
        setOrderBy(event.target.value);
    }

    function handleFilterSearch(){
        setFilterSearchPath(`?sort_by=${filterSelected}`+ "&order="+orderBy)
    }

    useEffect(() => {
        setActivePage("home");
        if(filterSearchPath===""){
            getAllArticles().then(({data:{articles}}) => {
                setPages(Math.ceil(articles.length/8));
                getArticlesByPage(1).then(({data:{articles}}) => {
                    setArticleList(articles);
                    if(articles.length === 0){
                        setIsEmptyContent(true);
                    }
                }).catch((err) => {
                    if(err.status === 404){
                        setIsNotFound(true);
                    }
                    if(err.status === 400){
                        setIsBadRequest(true);
                    }
                });
                setLoading(false);
            }).catch((err) => {
                if(err.status === 404){
                    setIsNotFound(true);
                }
                if(err.status === 400){
                    setIsBadRequest(true);
                }
            })
        }
        else{
            getArticlesSortBy(filterSearchPath).then(({data:{articles}}) => {
                setPages(Math.ceil(articles.length/8));
                getArticlesSortByByPage(filterSearchPath,1).then(({data:{articles}}) => {
                    setArticleList(articles);
                    if(articles.length === 0){
                        setIsEmptyContent(true);
                    }
                }).catch((err) => {
                    if(err.status === 404){
                        setIsNotFound(true);
                    }
                    if(err.status === 400){
                        setIsBadRequest(true);
                    }
                });
                setLoading(false);
            }).catch((err) => {
                if(err.status === 404){
                    setIsNotFound(true);
                }
                if(err.status === 400){
                    setIsBadRequest(true);
                }
            })
        }

    }, [pages,filterSearchPath]);

    if(isEmptyContent){
        return (<Error error={0} />);
    }

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
    else{
        const pageNumbers= []
        for(let i=1;i<=pages;i++){
            pageNumbers.push(i);
        }
        function fetchArticlesByPage(event){
            const pageClicked = parseInt((event.currentTarget.textContent));
            if(filterSearchPath === ""){
                getArticlesByPage(pageClicked).then(({data:{articles}}) => {
                    setArticleList(articles);
                    setCurrentPage(pageClicked);
                });
            }
            else{
                getArticlesSortByByPage(filterSearchPath,pageClicked).then(({data:{articles}}) => {
                    setArticleList(articles);
                    setCurrentPage(pageClicked);
                });
            }
        }
        return(
            <>
                <div className="relative flex justify-end items-center text-left mr-7">
                    <div className="flex justify-center items-center bg-white">
                        <button type="button" className="group inline-flex min-w-max justify-center gap-x-1.5 rounded-md
                        bg-white px-6 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300
                        ring-inset hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={handleFilterButton}>
                            Article Filter
                            <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                                 aria-hidden="true" data-slot="icon">
                                <path fillRule="evenodd"
                                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                      clipRule="evenodd"/>
                            </svg>
                            <div
                                className={`absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-white ring-1
                                    shadow-lg ring-black/5 ${filterButtonClickCount % 2 === 0 ? "scale-y-0":"scale-y-100"} top-8`}
                                role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                <div className="py-1" role="none">
                                    <form className="sort-select">
                                        <div className="flex px-4 py-2 text-sm text-gray-700 ml-4" role="menuitem" tabIndex="-1"
                                             id="menu-item-0">
                                            <input type="radio" id="sort-by-date" value="created_at" className="mr-5" name="sort-option" onChange={handleFilterSelection}></input>
                                            <p>Date</p>
                                        </div>
                                        <div className="flex px-4 py-2 text-sm text-gray-700 ml-4" role="menuitem" tabIndex="-1"
                                             id="menu-item-1">
                                            <input type="radio" id="sort-by-comment-count" value="comment_count" className="mr-5" name="sort-option" onChange={handleFilterSelection}></input>
                                            <p>Comment Count</p>
                                        </div>
                                        <div className="flex px-4 py-2 text-sm text-gray-700 ml-4" role="menuitem" tabIndex="-1"
                                             id="menu-item-2">
                                            <input type="radio" id="sort-by-votes" value="votes" className="mr-5" name="sort-option" onChange={handleFilterSelection}></input>
                                            <p>Votes</p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </button>

                        <button type="button" className="group inline-flex min-w-max justify-center gap-x-1.5 rounded-md
                        bg-white px-6 py-2 ml-5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300
                        ring-inset hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={handleOrderButton}>
                            Sort Order
                            <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                                 aria-hidden="true" data-slot="icon">
                                <path fillRule="evenodd"
                                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                      clipRule="evenodd"/>
                            </svg>
                            <div
                                className={`absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-white ring-1
                                    shadow-lg ring-black/5 ${orderButtonClickCount % 2 === 0 ? "scale-y-0":"scale-y-100"} top-8`}
                                role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                <div className="py-1" role="none">
                                    <form className="sort-select">
                                        <div className="flex px-4 py-2 text-sm text-gray-700 ml-4" role="menuitem" tabIndex="-1"
                                             id="menu-item-0">
                                            <input type="radio" id="sort-by-date" value="DESC" className="mr-5" name="sort-option" onChange={handleOrderSelection}></input>
                                            <p>Descending</p>
                                        </div>
                                        <div className="flex px-4 py-2 text-sm text-gray-700 ml-4" role="menuitem" tabIndex="-1"
                                             id="menu-item-1">
                                            <input type="radio" id="sort-by-comment-count" value="ASC" className="mr-5" name="sort-option" onChange={handleOrderSelection}></input>
                                            <p>Ascending</p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </button>

                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                        focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 ml-5 text-center
                         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleFilterSearch}>
                            Search Articles
                        </button>

                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                        focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 ml-5 text-center
                         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{window.location.reload()}}>
                            Reset Filters
                        </button>
                    </div>

                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                        focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2 ml-28 text-center
                         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:hidden mt-5" onClick={handleFilterSearch}>
                        Search Articles
                    </button>

                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                        focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2 ml-5 text-center
                         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:hidden mt-5" onClick={()=>{window.location.reload()}}>
                        Reset Filters
                    </button>

                </div>

                <div
                    className="list-of-articles grid sm:grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mr-3">
                    {articleList.map((article) => (
                        <ArticleSummary key={article.article_id} article={article}/>
                    ))
                    }
                </div>
                <div className={`pagination-bar flex justify-center mt-8`}>
                    <ul className="pagination flex flex-wrap justify-center items-center">
                        {pageNumbers.map((pageNumber) => (
                            <li key={pageNumber} className={`font-bold text-1xl 
                            ${currentPage === pageNumber ? 'bg-black text-white' : ""} border-black border-2 mx-3 
                            rounded-md px-8 py-2 cursor-pointer mt-3`} onClick={fetchArticlesByPage}>{pageNumber}</li>
                        ))}
                    </ul>
                </div>
            </>
        )
    }

}