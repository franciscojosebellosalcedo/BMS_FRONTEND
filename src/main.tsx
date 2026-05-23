import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Provider } from 'react-redux';
import { store } from './app/store/store.ts';
import { ThemeProvider } from './app/providers/ThemeProvider.tsx';
import { boostrapAuth } from './modules/auth/boostrapAuth.ts';

await boostrapAuth();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
