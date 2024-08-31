import { AutoComplete, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { TrekSearchDto } from "../../../../types/dto/treks/TrekSearch.dto";
import ApiService from "../../services/api.service";
import { useEffect, useState } from "react";
import TResponseCards from "../ResponseCards";
import Filter from "./Filter";
import { FilterInfo } from "../../utils/types";
import { DataView } from 'primereact/dataview';
import { Skeleton } from 'primereact/skeleton';
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";

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
            const durs = uniqueDur.map(item => ({ name: item, value: item }))
            const allLocation = results.flatMap(item => item.location)
            const uniqueLoc = Array.from(new Set(allLocation))
            const locs = uniqueLoc.map(item => ({ name: item, value: item }))
            const allOrganisers = results.flatMap(item => item.org)
            const uniqueOrg = Array.from(new Set(allOrganisers))
            const orgs = uniqueOrg.map(item => ({ name: item, value: item }))

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

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between gap-2">
            <Dropdown optionLabel="label" placeholder="Sort By Difficulty" />
            <span className="p-input-icon-left">
                <AutoComplete
                    aria-autocomplete="none"
                    value={searchValue}
                    suggestions={filteredSearch}
                    completeMethod={search}
                    placeholder="Search Trek Name"
                    onChange={(e) => setSearchValue(e.value)}
                />
                <Button
                    icon="pi pi-search"
                    onClick={handleSearch}
                />
            </span>
        </div>
    );

    const gridItem = (item: TrekSearchDto) => {
        return (
            <div className="col-12 sm:col-6 md:col-6 lg:col-3" >
                <div className="p-3 h-full">
                    <TResponseCards
                        data={item}
                    />
                </div>
            </div>
        )
    }

    const itemTemplate = (item: TrekSearchDto, layout: 'grid' | 'list' | (string & Record<string, unknown>)) => {
        if (!item) {
            return null;
        }

        return gridItem(item)
    };

    return (
        <div className="overflow-hidden flex flex-column flex-grow-1">
            <Card className="flex flex-column flex-grow-1" style={{ background: 'none' }}>
                <DataView value={filteredResults} itemTemplate={itemTemplate} layout={'grid'} header={header} paginator rows={8} />
            </Card>
        </div>
    )
}

export default Results