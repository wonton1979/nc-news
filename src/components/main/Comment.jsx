export default function Comment({comment}) {
    const createdAt = comment.created_at.slice(0, 10) + " " + comment.created_at.slice(11, 19);
    return(
        <div className="comment">
            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm
            hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 h-full">
                <p className="font-normal text-gray-700 dark:text-gray-400">{comment.body}</p>
                <div className="flex flex-row">
                    <p className="text-sm my-5 text-black dark:text-white font-bold">Author: {comment.author}</p>
                    <p className="text-sm my-5 text-black dark:text-white ml-5 font-bold">Date : {createdAt}</p>
                </div>
                <p className="text-sm text-black dark:text-white font-bold">Votes : {comment.votes}</p>
            </div>
        </div>
    )
}