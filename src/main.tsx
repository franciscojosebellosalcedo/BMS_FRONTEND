import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { ThemeProvider } from './app/providers/ThemeProvider.tsx';
import { store } from './app/store/store.ts';
import { boostrapAuth } from './modules/auth/boostrapAuth.ts';

await boostrapAuth();

createRoot(document.getElementById('root')!).render(
  <>
    <Toaster position='top-center' reverseOrder={false} />
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </>
)
