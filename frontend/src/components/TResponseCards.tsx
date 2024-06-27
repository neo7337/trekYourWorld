import { Button } from "primereact/button";

const TResponseCards: React.FC = () => {
  return (
    <div
      className="shadow-2 p-3 h-full flex flex-column"
      style={{ borderRadius: "6px" }}
    >
      <div className="text-900 font-medium text-xl mb-2">Basic</div>
      <div className="text-600">Plan description</div>
      <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
      <div className="flex align-items-center">
        <span className="font-bold text-2xl text-900">$9</span>
        <span className="ml-2 font-medium text-600">per month</span>
      </div>
      <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
      <ul className="list-none p-0 m-0 flex-grow-1">
        <li className="flex align-items-center mb-3">
          <i className="pi pi-check-circle text-green-500 mr-2"></i>
          <span>Arcu vitae elementum</span>
        </li>
        <li className="flex align-items-center mb-3">
          <i className="pi pi-check-circle text-green-500 mr-2"></i>
          <span>Dui faucibus in ornare</span>
        </li>
        <li className="flex align-items-center mb-3">
          <i className="pi pi-check-circle text-green-500 mr-2"></i>
          <span>Morbi tincidunt augue</span>
        </li>
      </ul>
      <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto" />
      <Button label="Book Now" className="p-3 w-full mt-auto" />
    </div>
  );
};

export default TResponseCards;
