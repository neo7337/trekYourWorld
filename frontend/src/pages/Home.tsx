import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {

    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/search');
    }

    return (
        <div
            style={{ minHeight: "250px" }}
            className="surface-0 flex flex-column pt-4 overflow-auto"
        >
            <div className="flex flex-column pt-4 w-full overflow-hidden">
                <div className="grid grid-nogutter surface-0 text-800">
                    <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center">
                        <section>
                            <span className="block text-6xl font-bold mb-1">
                                Looking for your next trek?
                            </span>
                            <div className="text-6xl text-primary font-bold mb-3">
                                Let's make a better choice
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
                            src="/images/home.jpeg"
                            alt="hero-1"
                            className="md:ml-auto block md:h-full"
                            style={{
                                clipPath:
                                    "polygon(8% 0, 100% 0%, 100% 100%, 0 100%)",
                            }}
                            width={500}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
