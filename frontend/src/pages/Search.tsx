import ApiService from "../services/api.service";
import React, { useEffect, useRef, useState } from "react";
import { TrekSearchDto } from "../../../types/dto/TrekSearch.dto";
import { AutoComplete, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { Toast } from "primereact/toast";
import { showToast } from "../utils/utils";
import { Button } from "primereact/button";
import TResponseCards from "../components/ResponseCards";

const svc = new ApiService();

const Search: React.FC = () => {
    const toast = useRef<Toast>(null);
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
                    return country
                        .toLowerCase()
                        .startsWith(event.query.toLowerCase());
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

    return (
        <div id="search" className="surface-0 flex flex-column pt-4">
            <Toast ref={toast} position="bottom-right" />
            <div className="grid grid-nogutter surface-0 text-800">
                <div className="col-12 text-align-center text-900 font-bold text-6xl mb-4 text-center">
                    Search Your Trek
                </div>
                <div className="col-12 text-700 text-xl mb-6 text-center line-height-3 w-6 m-auto">
                    <div className="p-inputgroup">
                        <AutoComplete
                            aria-autocomplete="none"
                            value={searchValue}
                            suggestions={filteredSearch}
                            completeMethod={search}
                            onChange={(e) => setSearchValue(e.value)}
                        />
                        <Button
                            icon="pi pi-search"
                            onClick={handleSearch}
                        />
                    </div>
                </div>

                <div className="col-12">
                    <div className="grid grid-nogutter">
                        {results.length === 0 ? (
                            <div className="col-12 text-align-center text-900 font-bold text-2xl mb-4 text-center">
                                No Results!
                            </div>
                        ) : (
                            results.map(
                                (
                                    result: TrekSearchDto,
                                    index: number
                                ) => {
                                    return (
                                        <div
                                            key={index}
                                            className="col-12 lg:col-4"
                                        >
                                            <div className="p-3 h-full">
                                                <TResponseCards
                                                    data={result}
                                                />
                                            </div>
                                        </div>
                                    );
                                }
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;