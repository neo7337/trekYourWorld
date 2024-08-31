import { AutoComplete, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { TrekSearchDto } from "../../../../types/dto/treks/TrekSearch.dto";
import ApiService from "../../services/api.service";
import { useEffect, useState } from "react";
import TResponseCards from "../ResponseCards";
import Filter from "./Filter";
import { FilterInfo } from "../../utils/types";

const svc = new ApiService();

const Results: React.FC = () => {

    const [searchValue, setSearchValue] = useState("");
    const [results, setResults] = useState<TrekSearchDto[]>([]);
    const [filteredResults, setFilteredResults] = useState<TrekSearchDto[]>([]);
    const [searchItems, setSearchItems] = useState<string[]>([]);
    const [filteredSearch, setFilteredSearch] = useState<string[]>([]);
    const [loadingResults, setLoadingResults] = useState<boolean>(false);
    const [filterData, setFilterData] = useState<FilterInfo>({
        difficulty: [],
        duration: [],
        location: [],
        organiser: []
    })

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

    useEffect(() => {
        const fetchData = async () => {
            setLoadingResults(true);
            const [treksResponse, searchResponse] = await Promise.all([
                svc.get(`api/v1/treks`),
                svc.get(`api/v1/treks/search?trekName=`)
            ]);
            setSearchItems(treksResponse.body);
            setResults(searchResponse.body);
            setFilteredResults(searchResponse.body)
            setLoadingResults(false);
        };
        
        fetchData();
    }, []);

    useEffect(() => {
        const generateFilterData = () => {
            const allDifficulty = results.flatMap(item => item.difficulty)
            const uniqueDiff = Array.from(new Set(allDifficulty))
            const diffs = uniqueDiff.map(item => ({ name: item, value: item }))
            const allDuration = results.flatMap(item => item.duration)
            const uniqueDur = Array.from(new Set(allDuration))
            const durs = uniqueDur.map(item => ({ name: item, value: item}))
            const allLocation = results.flatMap(item => item.location)
            const uniqueLoc = Array.from(new Set(allLocation))
            const locs = uniqueLoc.map(item => ({ name: item, value: item}))
            const allOrganisers = results.flatMap(item => item.org)
            const uniqueOrg = Array.from(new Set(allOrganisers))
            const orgs = uniqueOrg.map(item => ({ name: item, value: item}))

            const newFilterData: FilterInfo = {
                organiser: orgs,
                location: locs,
                duration: durs,
                difficulty: diffs
            }

            setFilterData(newFilterData)
        }
        if (results.length > 0) {
            generateFilterData()
        }
    }, [results])

    const handleSearch = async () => {
        setLoadingResults(true);
        const response = await svc.get(
            `api/v1/treks/search?trekName=${searchValue}`
        );
        setLoadingResults(false);
        // setResults(response.body);
        setFilteredResults(response.body)
    };

    const filterAddedCallback = (addedFilter: any) => {
        console.log(addedFilter)
        const filteredData = results.filter(result => {
            return (
                (addedFilter.organiser === null || addedFilter.organiser.length === 0 || addedFilter.organiser.includes(result.org)) &&
                (addedFilter.location === null || addedFilter.location.length === 0 || addedFilter.location.includes(result.location)) &&
                (addedFilter.duration === null || addedFilter.duration.length === 0 || addedFilter.duration.includes(result.duration)) &&
                (addedFilter.difficulty === null || addedFilter.difficulty.length === 0 || addedFilter.difficulty.includes(result.difficulty))
            )
        })
        setFilteredResults(filteredData)
    }

    return (
        <div className="grid grid-nogutter overflow-hidden">
            <div className="col-12 lg:col-2">
                <Filter filterData={filterData} addedFilter={filterAddedCallback}/>
            </div>
            <div className="col-12 lg:col-10">
                <div className="grid grid-nogutter">
                    <div className="col-12 text-align-center text-white-alpha-90 text-900 font-bold text-6xl mb-4 text-center">
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
                        <div className="grid grid-nogutter overflow-auto">
                            {loadingResults ? (
                                <div className="col-12 text-align-center text-900 font-bold text-2xl mb-4 text-center">
                                    <ProgressSpinner />
                                </div>
                            ) : (filteredResults.length === 0 ? (
                                <div className="col-12 text-align-center text-900 font-bold text-2xl mb-4 text-center">
                                    No Results!
                                </div>
                            ) : (
                                filteredResults.map(
                                    (
                                        result: TrekSearchDto,
                                        index: number
                                    ) => {
                                        return (
                                            <div
                                                key={index}
                                                className="col-12 sm:col-6 md:col-6 lg:col-3"
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
                            )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Results