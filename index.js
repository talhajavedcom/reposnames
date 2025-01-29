import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import AxiosInterceptor from './utils/AxiosInterceptor';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
AxiosInterceptor.initialize();
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
