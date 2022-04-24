import React from 'react';
import "./style/index.css";
import App from "./App";
import ViewportProvider from "./context/viewportContext";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  // <React.StrictMode>
  <ViewportProvider>
    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </ViewportProvider>
  // </React.StrictMode>
);
