import React from "react";
import TMenuBar from "./components/TMenuBar";
import TFooter from "./components/TFooter";
import TContainer from "./components/TContainer";

const App: React.FC = () => {
    return (
        <div className="surface-0 flex justify-content-center">
            <div id="home" className="landing-wrapper overflow-hidden">
                <div id="topBar">
                    <TMenuBar />
                </div>
                <div id="container" className="app-container flex-grow-1">
                    <TContainer />
                </div>
                <div id="footer" className="app-footer">
                    <TFooter />
                </div>
            </div>
        </div>
    );
};

export default App;
