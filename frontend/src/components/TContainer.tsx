import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { KeyboardEvent, useState } from "react";
import TIntroduction from "./TIntroduction";
import TResponseCards from "./TResponseCards";

const TContainer: React.FC = () => {
  const [getStarted, setGetStarted] = useState(false);
  const [showIntroduction, setShowIntroduction] = useState(true);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("enter key pressed");
    }
  };

  const handleGetStartedClick = () => {
    setShowIntroduction(false); // Hide the introduction component
    setTimeout(() => setGetStarted(true), 1000);
  };

  return (
    <div
      style={{ minHeight: "250px" }}
      className="surface-0 flex flex-column pt-4 px-4 lg:px-8 overflow-auto"
    >
      <div
        className={
          showIntroduction
            ? "flex align-items-center justify-content-center"
            : "fadeoutup animation-duration-1000 flex align-items-center justify-content-center hidden"
        }
        onAnimationEnd={() => setShowIntroduction(false)}
      >
        {!getStarted && (
          <TIntroduction getStartedCallback={handleGetStartedClick} />
        )}
      </div>
      {getStarted && (
        <div className="surface-0">
          <div className="text-900 font-bold text-6xl mb-4 text-center">
            Search Your Trek!
          </div>
          <div className="text-700 text-xl mb-6 text-center line-height-3">
            <div className="p-inputgroup flex">
              <InputText
                placeholder="Enter your trek name!"
                onKeyDown={handleKeyDown}
              />
              <Button icon="pi pi-search" className="" />
            </div>
          </div>

          <div className="grid">
            <div className="col-12 lg:col-4">
              <div className="p-3 h-full">
                <TResponseCards />
              </div>
            </div>

            <div className="col-12 lg:col-4">
              <div className="p-3 h-full">
                <TResponseCards />
              </div>
            </div>

            <div className="col-12 lg:col-4">
              <div className="p-3 h-full">
                <TResponseCards />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TContainer;
