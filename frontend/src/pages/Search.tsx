import React from "react";
import Results from "../components/search/Results";

const Search: React.FC = () => {
    return (
        <div id="search" className="flex flex-grow-1 flex-column">
            <Results />
        </div>
    )
}

export default Search;