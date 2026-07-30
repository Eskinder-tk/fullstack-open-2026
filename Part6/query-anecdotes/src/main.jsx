import { createRoot } from 'react-dom/client'
import {NotificationContextProvider} from './NotificationContext.jsx'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <NotificationContextProvider>
  <QueryClientProvider client={queryClient}>
    
    <App />

  </QueryClientProvider>
  </NotificationContextProvider>
)