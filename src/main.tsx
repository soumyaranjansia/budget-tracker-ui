import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App'; // ✅ Correct path
import { DashboardStore } from './features/Api/DashboardStore'; // ✅ Remove .js

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={DashboardStore}>
      <App />
    </Provider>
  </StrictMode>,
);
