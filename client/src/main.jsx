import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import Store from './store/store';
import App from './App';

const store = new Store()

export const Context = createContext({
  store
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Context.Provider value={{store}}>
      <App/>
    </Context.Provider>
  </React.StrictMode>,
)
