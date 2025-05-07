import React from "react";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSection from '../components/FilterSection';
import { IoSearchSharp } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";

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
            <div className="w-full flex flex-wrap justify-between gap-2 ">
                <div className="flex gap-2 flex-wrap">
                    <input
                        ref={searchRef}
                        type="text"
                        className="bg-transparent border p-2 rounded-md md:w-[300px]"
                        placeholder="Search..."
                    />
                    <button
                        className="px-3 py-2 rounded-md bg-green-800 text-white hover:bg-green-800/80 flex items-center gap-2"
                        onClick={handleSearch}
                    >
                    <BsSearch />  <span className="md:block hidden">Search</span>
                    </button>
                </div>
                <button
                    onClick={toggleFilter}
                    className="flex gap-1 items-center bg-green-800 text-white hover:bg-green-800/80 rounded-md px-3 py-2"
                >
                    <FaFilter /> <span className="md:block hidden">Filters</span>
                </button>
                
            </div>
            <FilterSection openFilter={openFilter} toggleFilter={toggleFilter} applyFilters={handleFilter} pageName={pageName} />

        </>
    );
};

export default FilterInteraction;
