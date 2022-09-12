import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import CartProvider from './store/CartProvider';
import { AuthProvider } from './store/auth-context';
import AdminMealsCtxProvider from './store/AdminMealsCtxProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <CartProvider>
      <AuthProvider>
        <AdminMealsCtxProvider>
          <App />
        </AdminMealsCtxProvider>
      </AuthProvider>
    </CartProvider>
  </BrowserRouter>
);
