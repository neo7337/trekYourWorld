import { TrekSearchDto } from "../../../types/dto/TrekSearch.dto";
import { Button } from "primereact/button";

interface Props {
    data: TrekSearchDto;
}

const TResponseCards: React.FC<Props> = (props: Props) => {
    return (
        <div
            className="shadow-2 p-3 h-full flex flex-column"
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
                <span className="font-bold text-2xl text-900">$9</span>
                <span className="ml-2 font-medium text-600">per month</span>
            </div>
            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
            <ul className="list-none p-0 m-0 flex-grow-1">
                <li className="flex align-items-center mb-3">
                    <i className="pi pi-map-marker text-green-500 mr-2"></i>
                    <span className="font-bold">Location: </span> <span></span>
                </li>
                <li className="flex align-items-center mb-3">
                    <i className="pi pi-wave-pulse text-green-500 mr-2"></i>
                    <span className="font-bold">Elevation: </span>
                </li>
                <li className="flex align-items-center mb-3">
                    <i className="pi pi-clock text-green-500 mr-2"></i>
                    <span className="font-bold">Duration: </span>
                </li>
                <li className="flex align-items-center mb-3">
                    <i className="pi pi-wrench text-green-500 mr-2"></i>
                    <span className="font-bold">Difficulty: </span>
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

export default TResponseCards;
