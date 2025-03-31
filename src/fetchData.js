import axios from 'axios';

const api = axios.create({
    baseURL: 'https://nc-news-api-ph2d.onrender.com/api',
})

export const getAllArticles = () => {
    return  api.get('/articles')
}


