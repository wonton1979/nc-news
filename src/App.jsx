import {Route,Routes} from "react-router";
import Header from './components/header/Header.jsx'
import ListOfArticles from './components/main/ListOfArticles.jsx'

function App() {

  return (
    <>
      <Header />
        <Routes>
            <Route path="/" element={<ListOfArticles />} />
        </Routes>
    </>
  )
}

export default App
