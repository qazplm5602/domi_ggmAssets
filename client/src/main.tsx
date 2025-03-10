import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@styles/main/style.scss';
import App from '@pages/App/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
