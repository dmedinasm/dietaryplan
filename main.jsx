import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { Datos } from './context/Context.jsx'

ReactDOM.createRoot(document.getElementById('app')).render(
    <Datos>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Datos>
)

