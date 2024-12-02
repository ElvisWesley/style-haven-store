import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { validateEnvironmentVariables } from './utils/config';

// Validate environment variables before starting the app
validateEnvironmentVariables();

createRoot(document.getElementById("root")!).render(<App />);