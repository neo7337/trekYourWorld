import { useEffect, useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { MultiSelect } from 'primereact/multiselect';
import { FloatLabel } from 'primereact/floatlabel';
import { Divider } from 'primereact/divider';
import { FilterInfo } from '@/utils/types';

interface Props {
    filterData: FilterInfo
    addedFilter: (filterProps: any) => void
}

const Filter: React.FC<Props> = (props: Props) => {

    const [difficulty, setDifficulty] = useState(null);
    let difficultyVals = useRef([{}]);
    const [duration, setDuration] = useState(null)
    let durationVals = useRef([{}])
    const [location, setLocation] = useState(null)
    let locationVals = useRef([{}])
    const [organiser, setOrganiser] = useState(null)
    let organiserVals = useRef([{}])

    useEffect(() => {
        difficultyVals.current = props.filterData.difficulty
        durationVals.current = props.filterData.duration
        locationVals.current = props.filterData.location
        organiserVals.current = props.filterData.organiser
    }, [props.filterData])

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

        props.addedFilter(newFilter)
    }

    return (
        <div className="card h-full">
            <Card title="Filters">
                <div className="m-0">
                    <div className='mt-5'>
                        <FloatLabel>
                            <MultiSelect value={organiser} onChange={(e) => handleFilterChange('org', e.value)} options={organiserVals.current} optionLabel="name"
                                className="w-full" />
                            <label htmlFor="ms-cities">Organiser</label>
                        </FloatLabel>
                    </div>
                    <Divider />
                    <div className='mt-5'>
                        <FloatLabel>
                            <MultiSelect value={location} onChange={(e) => handleFilterChange('loc', e.value)} options={locationVals.current} optionLabel="name"
                                className="w-full" />
                            <label htmlFor="ms-cities">Location</label>
                        </FloatLabel>
                    </div>
                    <Divider />
                    <div className='mt-5'>
                        <FloatLabel>
                            <MultiSelect value={duration} onChange={(e) => handleFilterChange('dur', e.value)} options={durationVals.current} optionLabel="name"
                                className="w-full" />
                            <label htmlFor="ms-cities">Duration</label>
                        </FloatLabel>
                    </div>
                    <Divider />
                    <div className='mt-5'>
                        <FloatLabel>
                            <MultiSelect value={difficulty} onChange={(e) => handleFilterChange('diff', e.value)} options={difficultyVals.current} optionLabel="name"
                                className="w-full" />
                            <label htmlFor="ms-cities">Difficulty</label>
                        </FloatLabel>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Filter