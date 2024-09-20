import { TrekSearchDto } from "../../../../types/dto/treks/TrekSearch.dto";
import TResponseCards from "../ResponseCards";
import { DataView } from 'primereact/dataview';
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useState } from "react";

interface Props {
    results: TrekSearchDto[],
    loadingResults: boolean
}

const Results: React.FC<Props> = (props: Props) => {

    const [sortLevel, setSortlevel] = useState('none')

    const handleSorting = () => {
        if (sortLevel === 'none') {
            setSortlevel('ascent')
        } else if (sortLevel === 'ascent') {
            setSortlevel('descent')
        } else {
            setSortlevel('none')
        }

        // filter the results based on the sort type
    }

    const getSortLabel = () => {
        switch (sortLevel) {
            case 'ascent':
                return "Difficulty: Easy to Challenging"
            case 'descent':
                return "Difficulty: Challenging to Easy"
            default:
                return "Sort By Difficulty"
        }
    }

    const getSortIcon = () => {
        switch (sortLevel) {
            case 'ascent':
                return "pi pi-sort-up-fill"
            case 'descent':
                return "pi pi-sort-down-fill"
            default:
                return "pi pi-sort"
        }
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between gap-2 p-2">
            <div className="flex flex-column md:flex-row md:flex-wrap gap-2">
                <Button label={getSortLabel()} icon={getSortIcon()} severity="info" text onClick={handleSorting} />
            </div>
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
                <DataView value={props.results}
                    itemTemplate={itemTemplate}
                    layout={'grid'}
                    header={header}
                    paginator
                    loading={props.loadingResults}
                    rows={8} />
            </Card>
        </div>
    )
}

export default Results