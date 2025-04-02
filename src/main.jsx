import {BrowserRouter} from "react-router";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {PostCommentStateProvider} from "./contexts/contextProvider.jsx";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <PostCommentStateProvider>
          <App />
      </PostCommentStateProvider>
  </BrowserRouter>
)
