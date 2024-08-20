import React from "react";
import ReactDOM from "react-dom/client";

import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primeflex/primeflex.css";
import "primeflex/themes/primeone-light.css";
import "primeicons/primeicons.css";

import "./styles/layout.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
