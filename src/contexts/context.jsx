import {createContext, useState} from "react";

export const ArticleContext = createContext(undefined)

export const ArticleIdProvider = ({ children }) => {
    const [articleId, setArticleId] = useState(null)
    return (
        <ArticleContext.Provider value={{articleId,setArticleId}}>
            {children}
        </ArticleContext.Provider>
    );
};

