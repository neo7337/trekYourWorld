import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {

    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/search');
    }

    return (
        <div className="flex justify-content-center flex-wrap overflow-hidden h-full"
        >
            <div style={{ minHeight: "250px" }} className="grid grid-nogutter text-800 flex align-items-center justify-content-center">
                <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center">
                    <section className="text-white-alpha-90">
                        <span className="block text-xl font-italic mb-1">
                            go where the trail leads you
                        </span>
                        <div className="text-6xl font-bold mb-3">
                            trekYourWorld
                        </div> <br/>
                        <div className="text-2xl font-bold mb-3">
                            Hey there, fellow thrill seeker!
                        </div>
                        <div className="text-2xl font-bold mb-3">
                            Embark on your next journey while comparing prices and much more, under one roof!
                        </div>

                        <Button
                            label="Get Started!"
                            icon="pi pi-bolt"
                            className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"
                            onClick={handleGetStartedClick}
                        />
                    </section>
                </div>
                <div className="col-12 md:col-6 overflow-hidden">
                    <img
                        src="/images/home_primary.JPG"
                        alt="hero-1"
                        className="md:ml-auto block md:h-full"
                        width={500}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
