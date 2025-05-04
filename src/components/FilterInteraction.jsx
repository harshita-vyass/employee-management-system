import React from "react";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSection from '../components/FilterSection';

const FilterInteraction = ({ functionName, setPage, page, searchRef, setPayload, pageName }) => {
    const [openFilter, setOpenFilter] = useState(false);

    const handleSearch = () => {
        if (page === 1) {
            functionName(1)
        } else {
            setPage(1)
        }
    }

    const toggleFilter = () => {
        setOpenFilter(!openFilter);
    };


    const handleFilter = (payload) => {
        console.log(payload);
        setPayload(payload)
        setPage(1)
        toggleFilter()

    }
    return (
        <>
            <div className="w-4/5 flex gap-2 ">
                <input
                    ref={searchRef}
                    type="text"
                    className="bg-transparent border p-2 rounded-md"
                    placeholder="Search..."
                />
                <button
                    className="px-1.5 py-1 rounded-md bg-green-800 text-white hover:bg-green-800/80"
                    onClick={handleSearch}
                >
                    Search
                </button>
                <button
                    onClick={toggleFilter}
                    className="flex gap-1 items-center bg-green-800 text-white hover:bg-green-800/80 rounded-md px-1.5 py-1"
                >
                    <FaFilter /> Filters
                </button>
            </div>
            <FilterSection openFilter={openFilter} toggleFilter={toggleFilter} applyFilters={handleFilter} pageName={pageName} />

        </>
    );
};

export default FilterInteraction;
