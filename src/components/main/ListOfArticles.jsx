import {getAllArticles} from "../../fetchData.js";
import {useEffect, useState} from "react";
import ArticleSummary from "./ArticleSummary.jsx";

export default function ListOfArticles() {
    const [articleList, setArticleList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState(0);
    useEffect(() => {
        getAllArticles().then(({data:{articles}}) => {
            setArticleList(articles);
            setPages(Math.ceil(articles.length));
            })
    }, [pages]);
    return (
        <div className="list-of-articles grid sm:grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {articleList.map((article) => (
                <ArticleSummary key={article.article_id} article={article} />
            ))}
        </div>
    )
}