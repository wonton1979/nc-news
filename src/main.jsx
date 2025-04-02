import {BrowserRouter} from "react-router";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {PostCommentStateProvider,UsernameProvider,CurrentPageProvider} from "./contexts/contextProvider.jsx";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <CurrentPageProvider>
          <UsernameProvider>
              <PostCommentStateProvider>
                  <App />
              </PostCommentStateProvider>
          </UsernameProvider>
      </CurrentPageProvider>
  </BrowserRouter>
)
