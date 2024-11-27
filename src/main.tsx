import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { FormProvider } from 'react-hook-form';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>

  // </StrictMode>,
  <App />
);
