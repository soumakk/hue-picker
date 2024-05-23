import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ColorProvider } from './lib/ColorContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ColorProvider>
			<App />
		</ColorProvider>
	</React.StrictMode>
)
