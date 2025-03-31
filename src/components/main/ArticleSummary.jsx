import {Link} from "react-router";

export default function ArticleSummary({article}) {
    const createdAt = article.created_at.slice(0, 10) + " " + article.created_at.slice(11, 19);
    return (
        <div className="ml-5 my-5">
            <Link to={`/articles/${article.article_id}`}>
                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-md shadow-md hover:bg-gray-100
                dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 h-full">
                    <div className="flex flex-col gap-4">
                        <h6 className="text-xl mt-2 font-bold tracking-tight text-gray-900 dark:text-white">{article.title}</h6>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Topic : {article.topic}</p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Author : {article.author}</p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Created At : {createdAt}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}