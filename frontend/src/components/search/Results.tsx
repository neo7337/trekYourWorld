import { useEffect, useState } from "react";
import { AutoComplete, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { TrekSearchDto } from "../../../../types/dto/treks/TrekSearch.dto";
import ApiService from "../../services/api.service";
import TResponseCards from "../ResponseCards";
import { FilterInfo } from "../../utils/types";
import { DataView } from 'primereact/dataview';
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { OrganisationsMap, DifficultyMap } from "../../utils/enums";
import { MultiSelect } from "primereact/multiselect";

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
    const [organiser, setOrganiser] = useState(null)
    const [difficulty, setDifficulty] = useState(null);
    const [duration, setDuration] = useState(null)
    const [location, setLocation] = useState(null)
    const [difficultySort, setDifficultySort] = useState(null)
    const diffSort = [
        { name: 'Easy to Challenging', value: 'NY' },
        { name: 'Challenging to Easy', value: 'RM' },
    ];

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
            const uniqueDiff = Array.from(new Set(allDifficulty)).sort()
            const diffs = uniqueDiff.map(item => ({ name: DifficultyMap[item], value: item }))
            // TODO :: add sorting, ' days' to the values, add support to search with that string as well
            const allDuration = results.flatMap(item => item.duration)
            const uniqueDur = Array.from(new Set(allDuration))
            const durs = uniqueDur.map(item => ({ name: item, value: item }))
            const allLocation = results.flatMap(item => item.location)
            const uniqueLoc = Array.from(new Set(allLocation)).sort()
            const locs = uniqueLoc.map(item => ({ name: item, value: item }))
            const allOrganisers = results.flatMap(item => item.org)
            const uniqueOrg = Array.from(new Set(allOrganisers))
            const orgs = uniqueOrg.map(item => ({ name: OrganisationsMap[item], value: item }))

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
        setFilteredResults(response.body)
    };

    const filterAddedCallback = (addedFilter: any) => {
        const filteredData = filteredResults.filter(result => {
            return (
                (addedFilter.organiser === null || addedFilter.organiser.length === 0 || addedFilter.organiser.includes(result.org)) &&
                (addedFilter.location === null || addedFilter.location.length === 0 || addedFilter.location.includes(result.location)) &&
                (addedFilter.duration === null || addedFilter.duration.length === 0 || addedFilter.duration.includes(result.duration)) &&
                // TODO :: add support to search difficulty in the string array
                (addedFilter.difficulty === null || addedFilter.difficulty.length === 0 || addedFilter.difficulty.includes(result.difficulty))
            )
        })
        setFilteredResults(filteredData)
    }

    const handleFilterChange = (key: string, value: any) => {
        let newFilter = {
            organiser,
            location,
            duration,
            difficulty
        };

        if (key === 'org') {
            setOrganiser(value)
            newFilter.organiser = value
        } else if (key === 'loc') {
            setLocation(value)
            newFilter.location = value
        } else if (key === 'dur') {
            setDuration(value)
            newFilter.duration = value
        } else if (key === 'diff') {
            setDifficulty(value)
            newFilter.difficulty = value
        }

        filterAddedCallback(newFilter)
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between gap-2 p-2">
            <div className="flex flex-column md:flex-row md:flex-wrap gap-2">
                <FloatLabel>
                    <Dropdown value={difficultySort} options={diffSort} onChange={(e) => setDifficultySort(e.value)} showClear optionLabel="name" className="w-full md:w-14rem" />
                    <label htmlFor="ms-cities">Sort By Difficulty</label>
                </FloatLabel>
                <FloatLabel>
                    <MultiSelect value={organiser} onChange={(e) => handleFilterChange('org', e.value)} options={filterData.organiser} optionLabel="name"
                        className="w-full md:w-14rem" showClear />
                    <label htmlFor="ms-cities">Organiser</label>
                </FloatLabel>
                <FloatLabel>
                    <MultiSelect value={location} onChange={(e) => handleFilterChange('loc', e.value)} options={filterData.location} optionLabel="name"
                        className="w-full md:w-14rem" showClear />
                    <label htmlFor="ms-cities">Location</label>
                </FloatLabel>
                <FloatLabel>
                    <MultiSelect value={duration} onChange={(e) => handleFilterChange('dur', e.value)} options={filterData.duration} optionLabel="name"
                        className="w-full md:w-14rem" showClear />
                    <label htmlFor="ms-cities">Duration</label>
                </FloatLabel>
                <FloatLabel>
                    <MultiSelect value={difficulty} onChange={(e) => handleFilterChange('diff', e.value)} options={filterData.difficulty} optionLabel="name"
                        className="w-full md:w-14rem" showClear />
                    <label htmlFor="ms-cities">Difficulty</label>
                </FloatLabel>
            </div>
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
                    <TResponseCards data={item} />
                </div>
            </div>
        )
    }

    const itemTemplate = (item: TrekSearchDto, layout: 'grid' | 'list' | (string & Record<string, unknown>)) => {
        return gridItem(item)
    };

    return (
        <div className="overflow-hidden flex flex-column flex-grow-1">
            <Card className="flex flex-column flex-grow-1" style={{ background: 'none' }}>
                <DataView value={filteredResults}
                    itemTemplate={itemTemplate}
                    layout={'grid'}
                    header={header}
                    paginator
                    loading={loadingResults}
                    rows={8} />
            </Card>
        </div>
    )
}

export default Results