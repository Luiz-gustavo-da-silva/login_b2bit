import React from 'react'
import ReactDOM from 'react-dom/client'
import '../styles/global.css'
import Login from './login'
import Routering from '../routes/routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routering />
  </React.StrictMode>,
)
