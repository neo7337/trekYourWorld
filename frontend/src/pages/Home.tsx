import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {

    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/search');
    }

    return (
        <div className="flex-grow-1 flex justify-content-center align-items-center">
            <div className="grid w-full">
                <div className="col-12 md:col-6 lg:col-6">
                    <div className="flex align-items-center justify-content-center text-left p-3 border-round-sm h-full">
                        <section className="text-white-alpha-90">
                            <span className="block text-xl font-italic mb-1">
                                go where the trail leads you
                            </span>
                            <div className="text-6xl font-bold mb-3">
                                trekYourWorld
                            </div> <br />
                            <div className="text-2xl font-bold mb-3">
                                Hey there, fellow thrill seeker!
                            </div>
                            <div className="text-2xl font-bold mb-3">
                                Embark on your next journey
                            </div>
                            <div className="text-2xl font-bold mb-3">
                                Compare prices, routes and much more, under one roof!
                            </div>

                            <Button
                                label="Get Started!"
                                icon="pi pi-bolt"
                                className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"
                                onClick={handleGetStartedClick} />
                        </section>
                    </div>
                </div>
                <div className="col-12 md:col-6 lg:col-6">
                    <div className="text-center p-3 border-round-sm">
                        <img
                            src="/images/home_primary.JPG"
                            alt="hero-1"
                            className="m-auto block md:h-full md:w-30rem w-10rem" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
