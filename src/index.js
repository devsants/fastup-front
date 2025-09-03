import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Download from './components/Download';
import Upload from './components/Upload';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Utiliza o react-router-dom para gerenciar as rotas da aplicação
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/download',
    element: <Download />,
  },
  {
    path: '/upload',
    element: <Upload />,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
