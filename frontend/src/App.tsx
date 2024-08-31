import React from "react";
import Navbar from "./components/Navbar";
import AppRouter from "./AppRouter";
import Footer from "./components/Footer";
import { Toast } from "primereact/toast";

export const toastRef = React.createRef<Toast>();

const App: React.FC = () => {
    return (
        <div className="surface-0 flex justify-content-center h-full">
            <Toast ref={toastRef} position="bottom-right" />
            <div id="app" className="landing-wrapper overflow-hidden h-full" style={{
                backgroundImage: `url('/images/homepage.JPG')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
                <div id="topBar" className="topBar">
                    <Navbar />
                </div>
                <div id="container" className="app-container flex-grow-1">
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
