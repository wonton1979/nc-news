import {BrowserRouter} from "react-router";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ArticleIdProvider} from "./contexts/context.jsx";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <ArticleIdProvider>
          <App />
      </ArticleIdProvider>
  </BrowserRouter>
)
