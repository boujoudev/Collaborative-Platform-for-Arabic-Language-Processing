import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Messagerie from './Messagerie.jsx'
import Chatbot from './chatbot.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Chatbot /> */}
    <Messagerie />
  </StrictMode>,
)
