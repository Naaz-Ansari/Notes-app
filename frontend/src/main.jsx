import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-tooltip/dist/react-tooltip.css'
import App from './App.jsx'
import { store } from './store.js';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { Tooltip } from 'react-tooltip'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster />
      <Tooltip id="my-tooltip" />
    </Provider>
  </StrictMode>,
)
