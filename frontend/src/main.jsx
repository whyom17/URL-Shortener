import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { RouterProvider, router} from '@tanstack/react-router'
// import { routeTree } from './routes/routeTree.jsx'
import './index.css'
import App from './App.jsx'

// const queryClient = new QueryClient()
// const router = new router({routeTree})

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>  
    <App />
  </QueryClientProvider>
)
