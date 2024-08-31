import { Badge } from "primereact/badge";
import { TrekSearchDto } from "../../../types/dto/treks/TrekSearch.dto";
import { Button } from "primereact/button";

interface Props {
    data: TrekSearchDto;
}

const ResponseCards: React.FC<Props> = (props: Props) => {

    // format number to Indian rupee
    let rupee = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    });

    const formatCost = (cost: string) => {
        const costNumb = parseFloat(cost.replace(/,/g, ''))
        return rupee.format(costNumb)
    }

    const formatDifficulty = (difficulty: string[]) => {
        const elements = difficulty.join('-')
        return (
            <Badge value={elements} severity="info" style={{ marginLeft: '0.5rem' }} />
        )
    }

    return (
        <div
            className="surface-0 shadow-2 p-3 h-full flex flex-column"
            style={{ borderRadius: "6px" }}
        >
            <div className="text-900 font-medium text-xl mb-2">
                {props.data.title}
            </div>
            <div className="text-600">
                <span className="font-bold">Organiser:</span> {props.data.org}
            </div>
            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
            <div className="flex align-items-center">
                <span className="font-bold text-2xl text-900">{formatCost(props.data.cost)}</span>
            </div>
            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
            <ul className="list-none p-0 m-0 flex-grow-1">
                <li className="flex align-items-center mb-3">
                    <i className="pi pi-map-marker text-green-500 mr-2"></i>
                    <span className="font-bold">Location: </span> <span style={{ marginLeft: '0.5rem' }}>{props.data.location}</span>
                </li>
                <li className="flex align-items-center mb-3">
                    <i className="pi pi-wave-pulse text-green-500 mr-2"></i>
                    <span className="font-bold">Elevation: </span> <span style={{ marginLeft: '0.5rem' }}>{props.data.elevation} ft</span>
                </li>
                <li className="flex align-items-center mb-3">
                    <i className="pi pi-clock text-green-500 mr-2"></i>
                    <span className="font-bold">Duration: </span> <span style={{ marginLeft: '0.5rem' }}>{props.data.duration} days</span>
                </li>
                <li className="flex align-items-center mb-3">
                    <i className="pi pi-wrench text-green-500 mr-2"></i>
                    <span className="font-bold">Difficulty: </span> <span>{formatDifficulty(props.data.difficulty)}</span>
                </li>
            </ul>
            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto" />
            <div className="flex justify-content-between flex-wrap">
                <div className="flex align-items-center justify-content-center">
                    <Button
                        label="Show Details"
                        className="flex align-items-center justify-content-center p-3 mt-auto"
                        outlined
                    />
                </div>
                <div className="flex align-items-center justify-content-center">
                    <Button
                        label="Book Now"
                        className="flex align-items-center justify-content-center p-3 mt-auto"
                        onClick={() => window.open(props.data.url, "_blank")}
                    />
                </div>
            </div>
        </div>
    );
};

export default ResponseCards;
