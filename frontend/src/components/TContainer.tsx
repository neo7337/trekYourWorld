import { Button } from "primereact/button";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import React, { useEffect, useRef, useState } from "react";
import TIntroduction from "./TIntroduction";
import TResponseCards from "./TResponseCards";
import ApiService from "../services/api.service";
import { TrekSearchDto } from "../../../types/dto/TrekSearch.dto";
import { Toast } from "primereact/toast";
import { showToast } from "../utils/utils";

const svc = new ApiService();

const TContainer: React.FC = () => {
  const toast = useRef<Toast>(null);
  const [getStarted, setGetStarted] = useState(false);
  const [showIntroduction, setShowIntroduction] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<TrekSearchDto[]>([]);
  const [searchItems, setSearchItems] = useState<string[]>([]);
  const [filteredSearch, setFilteredSearch] = useState<string[]>([]);

  useEffect(() => {
    svc.get(`api/v1/treks`).then((response) => setSearchItems(response));
  }, []);

  const search = (event: AutoCompleteCompleteEvent) => {
    // TODO :: added search to be contains the main string
    setTimeout(() => {
      let _filteredCountries;
      if (!event.query.trim().length) {
        _filteredCountries = [...searchItems];
      } else {
        _filteredCountries = searchItems.filter((country) => {
          return country.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      setFilteredSearch(_filteredCountries);
    }, 250);
  };

  const handleSearch = async () => {
    if (searchValue === "") {
      showToast(
        toast,
        "warn",
        "Warning",
        "Please enter a trek to search!",
        3000
      );
      setResults([]);
    } else {
      const response = await svc.get(
        `api/v1/treks/search?trekName=${searchValue}`
      );
      setResults(response);
    }
  };

  const handleGetStartedClick = () => {
    setShowIntroduction(false); // Hide the introduction component
    setTimeout(() => setGetStarted(true), 1000);
  };

  return (
    <div
      style={{ minHeight: "250px" }}
      className="surface-0 flex flex-column pt-4 overflow-auto"
    >
      <Toast ref={toast} position="bottom-right" />
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
        <div className="surface-0 flex flex-column pt-4">
          <div className="grid grid-nogutter surface-0 text-800">
            <div className="col-12 text-align-center text-900 font-bold text-6xl mb-4 text-center">
              Search Your Trek
            </div>
            <div className="col-12 text-700 text-xl mb-6 text-center line-height-3 w-6 m-auto">
              <div className="p-inputgroup">
                <AutoComplete
                  value={searchValue}
                  suggestions={filteredSearch}
                  completeMethod={search}
                  onChange={(e) => setSearchValue(e.value)}
                />
                <Button icon="pi pi-search" onClick={handleSearch} />
              </div>
            </div>

            <div className="col-12">
              <div className="grid grid-nogutter">
                {results.length === 0 ? (
                  <div className="col-12 text-align-center text-900 font-bold text-2xl mb-4 text-center">
                    No Results!
                  </div>
                ) : (
                  results.map((result: TrekSearchDto, index: number) => {
                    return (
                      <div key={index} className="col-12 lg:col-4">
                        <div className="p-3 h-full">
                          <TResponseCards data={result} />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TContainer;
