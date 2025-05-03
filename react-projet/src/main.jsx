import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Messagerie from './Messagerie.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Messagerie />
  </StrictMode>,
)
