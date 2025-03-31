import {Route,Routes} from "react-router";
import Header from './components/header/Header.jsx'
import ListOfArticles from './components/main/ListOfArticles.jsx'
import Articles from './components/main/Article.jsx'
import {ArticleContext} from "./contexts/context.jsx";

function App() {

  return (
    <>
        <Header />
        <Routes>
            <Route path="/" element={<ListOfArticles />} />
            <Route path="/articles/:article_id" element={<Articles />} />
        </Routes>
    </>
  )
}

export default App
