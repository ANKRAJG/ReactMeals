import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CartProvider from './store/CartProvider';
import { AuthProvider } from './store/auth-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <CartProvider>
    <AuthProvider>
        <App />
    </AuthProvider>
  </CartProvider>
);
