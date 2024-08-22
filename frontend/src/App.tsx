import React from "react";
import Navbar from "./components/Navbar";
import AppRouter from "./AppRouter";
import Footer from "./components/Footer";

const App: React.FC = () => {
    return (
        <div className="surface-0 flex justify-content-center h-full">
            <div id="app" className="landing-wrapper overflow-hidden h-full">
                <div id="topBar">
                    <Navbar />
                </div>
                <div id="container" className="app-container flex-grow-1 flex-column">
                    <AppRouter />
                </div>
                <div id="footer" className="app-footer">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default App;
