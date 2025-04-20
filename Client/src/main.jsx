import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminDashboard from './AdminDashboard.jsx'
import { ProductsProvider } from './context/ProductsContext'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ProductsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App/>} />
          <Route path="/admin/*" element={<AdminDashboard/>} />
        </Routes>
      </BrowserRouter>
    </ProductsProvider>
  </AuthProvider>
)
