import axios from 'axios';

const api = axios.create({
    baseURL: 'https://nc-news-api-ph2d.onrender.com/api',
})

export const getAllArticles = () => {
    return  api.get('/articles')
}

export const getArticleById = (article_id) => {
    return  api.get(`/articles/${article_id}`)
}

export const getAllArticleComments = (article_id) => {
    return  api.get(`/articles/${article_id}/comments`)
}

export const getArticlesByPage= (page) => {
    return  api.get(`/articles?limit=8&p=${page}`)
}

export const patchArticleVotes = (article_id,inc_votes) => {
    return  api.patch(`/articles/${article_id}`,{inc_votes:inc_votes})
}

