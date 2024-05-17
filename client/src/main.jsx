import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";
import App from './App.jsx'
import "./styles/styles.scss";
//Store
import {store, persistedStore} from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";
//Context
import AuthContextProvider from "./context/AuthContext.jsx";
import ThemeContextProvider from "./context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate persistor={persistedStore}>
              <AuthContextProvider>
                  <ThemeContextProvider>
                      <App />
                  </ThemeContextProvider>
              </AuthContextProvider>
          </PersistGate>
      </Provider>
  </React.StrictMode>,
)
