import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css' // We'll create this next
import { AuthProvider } from './componets/Authcontext'  // Import Auth Provider


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>

    <App />
    </AuthProvider>

  </React.StrictMode>
)


