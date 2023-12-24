import ReactDOM from 'react-dom/client'
import App from './components/App/App.tsx'
import './index.css'
import AppProvider from './context/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <App />
  </AppProvider>
)


