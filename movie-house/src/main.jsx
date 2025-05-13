import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '../src/assets/css/loader.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/css/main.css';
import '../src/assets/css/sidebar.css';
import '../src/assets/css/login.css';

createRoot(document.getElementById('root')).render(
    <App />
)
