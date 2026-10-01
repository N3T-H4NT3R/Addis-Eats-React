import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SearchProvider } from './Context/SearchContext.jsx'
import { ThemeProvider } from './Context/ThemeContext.jsx'
import AuthProvider from './auth/AuthProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider>
      <SearchProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SearchProvider>
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
