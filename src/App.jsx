import {Route,Routes} from "react-router";
import Header from './components/header/Header.jsx'
import ListOfArticles from './components/main/ListOfArticles.jsx'
import Articles from './components/main/Article.jsx'
import User from './components/main/User.jsx'
import ViewMyComments from "./components/main/ViewMyComments.jsx";
import TopicSelect from "./components/main/TopicSelect.jsx";
import ArticlesBySort from "./components/main/ArticlesBySort.jsx";

function App() {

  return (
    <>
        <Header />
        <Routes>
            <Route path="/" element={<ListOfArticles />} />
            <Route path="/articles/:article_id" element={<Articles />} />
            <Route path="/user" element={<User />} />
            <Route path="/my-comments" element={<ViewMyComments />} />
            <Route path="/topics" element={<TopicSelect />} />
            <Route path="/articles/" element={<ArticlesBySort />} />
        </Routes>
    </>
  )
}

export default App
