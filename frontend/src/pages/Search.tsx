import React, { useEffect, useState } from "react"
import Results from "../components/search/Results"
import { Card } from "primereact/card"
import { FloatLabel } from "primereact/floatlabel"
import { MultiSelect } from "primereact/multiselect"
import { AutoComplete, AutoCompleteCompleteEvent } from "primereact/autocomplete"
import { Button } from "primereact/button"
import { FilterInfo } from "@/utils/types"
import { TrekSearchDto } from "../../../types/dto/treks/TrekSearch.dto"
import ApiService from "../services/api.service"
import { DifficultyMap, OrganisationsMap } from "../utils/enums"

const svc = new ApiService()

const Search: React.FC = () => {

    const [searchValue, setSearchValue] = useState("")
    const [results, setResults] = useState<TrekSearchDto[]>([])
    const [filteredResults, setFilteredResults] = useState<TrekSearchDto[]>([])
    const [searchItems, setSearchItems] = useState<string[]>([])
    const [filteredSearch, setFilteredSearch] = useState<string[]>([])
    const [loadingResults, setLoadingResults] = useState<boolean>(false)
    const [filterData, setFilterData] = useState<FilterInfo>({
        difficulty: [],
        duration: [],
        location: [],
        organiser: []
    })
    const [organiser, setOrganiser] = useState(null)
    const [difficulty, setDifficulty] = useState(null)
    const [duration, setDuration] = useState(null)
    const [location, setLocation] = useState(null)
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        const generateFilterData = () => {
            const allDifficulty = results.flatMap(item => item.difficulty)
            const uniqueDiff = Array.from(new Set(allDifficulty)).sort()
            const diffs = uniqueDiff.map(item => ({ name: DifficultyMap[item], value: item }))
            const allDuration = results.flatMap(item => item.duration)
            const uniqueDur = Array.from(new Set(allDuration)).map(Number).sort((a, b) => a-b).map(num => `${num} days`)
            const durs = uniqueDur.map(item => ({ name: item, value: item.replace(' days', '') }))
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
    useEffect(() => {
        const fetchData = async () => {
            setLoadingResults(true)
            const [treksResponse, searchResponse] = await Promise.all([
                svc.get(`api/v1/treks`),
                svc.get(`api/v1/treks/search?trekName=`)
            ])
            setSearchItems(treksResponse.body)
            setResults(searchResponse.body)
            setFilteredResults(searchResponse.body)
            setLoadingResults(false)
        }

        fetchData()
    }, [])

    const search = (event: AutoCompleteCompleteEvent) => {
        // TODO :: added search to be contains the main string
        setTimeout(() => {
            let _filteredCountries
            if (!event.query.trim().length) {
                _filteredCountries = [...searchItems]
            } else {
                _filteredCountries = searchItems.filter((country) => {
                    return country
                        .toLowerCase()
                        .startsWith(event.query.toLowerCase())
                })
            }
            setFilteredSearch(_filteredCountries)
        }, 250)
    }
    const handleSearch = async () => {
        setLoadingResults(true)
        const response = await svc.get(
            `api/v1/treks/search?trekName=${searchValue}`
        )
        if (searchValue !== '') {
            setHasSearched(true)
        } else {
            setHasSearched(false)
        }
        setLoadingResults(false)
        setFilteredResults(response.body)
    }

    const filterAddedCallback = async (addedFilter: any) => {
        setLoadingResults(true)
        const response = await svc.post(`api/v1/treks/filter`, addedFilter)
        setLoadingResults(false)
        setFilteredResults(response.body)
    }
    const handleFilterChange = (key: string, value: any) => {
        let newFilter = {
            organiser,
            location,
            duration,
            difficulty
        }

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

    return (
        <div id="search" className="grid">
            <div className="col-2 hidden md:block">
                <Card className="h-full border-solid">
                    <div className="flex flex-column gap-4">
                        <span className="p-input-icon-left w-full">
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
                        <FloatLabel>
                            <MultiSelect
                                value={organiser} onChange={(e) => handleFilterChange('org', e.value)} options={filterData.organiser}
                                optionLabel="name"
                                className="w-full" showClear 
                                disabled={hasSearched} />
                            <label htmlFor="ms-cities">Organiser</label>
                        </FloatLabel>
                        <FloatLabel>
                            <MultiSelect
                                value={location} onChange={(e) => handleFilterChange('loc', e.value)} options={filterData.location}
                                optionLabel="name"
                                className="w-full" showClear
                                disabled={hasSearched} />
                            <label htmlFor="ms-cities">Location</label>
                        </FloatLabel>
                        <FloatLabel>
                            <MultiSelect
                                value={duration} onChange={(e) => handleFilterChange('dur', e.value)} options={filterData.duration}
                                optionLabel="name"
                                className="w-full" showClear
                                disabled={hasSearched} />
                            <label htmlFor="ms-cities">Duration</label>
                        </FloatLabel>
                        <FloatLabel>
                            <MultiSelect
                                value={difficulty} onChange={(e) => handleFilterChange('diff', e.value)} options={filterData.difficulty}
                                optionLabel="name"
                                className="w-full" showClear
                                disabled={hasSearched} />
                            <label htmlFor="ms-cities">Difficulty</label>
                        </FloatLabel>
                        <span style={{ color: "#17a2b8" }}>Showing { filteredResults.length } results</span>
                        {/* <Button label="Apply Filter" severity="info"  /> */}
                    </div>
                </Card>
            </div>
            <div className="col-12 md:col-10">
                <div className="grid">
                    <Results results={filteredResults} loadingResults={loadingResults} />
                </div>
            </div>
        </div>
    )
}

export default Search