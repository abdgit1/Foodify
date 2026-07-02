import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './app/store.js';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>

      {/* <Provider store={store}> */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
      {/* </Provider> */}
  </StrictMode>,
);