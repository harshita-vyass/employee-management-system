import React, { useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import FilterList from './FilterList';
import SearchFilter from './SearchFilter';

const Drawer = ({ element, addFilterValue,selectedValues }) => {


    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <>
            <button className=" w-full" onClick={toggleDrawer}>
                <span className=" flex items-center gap-4 justify-between w-[90%] mx-auto font-bold">
                    {element.name}
                    {isDrawerOpen ? (
                        <IoIosArrowForward className="transform rotate-90 duration-300 " />
                    ) : (
                        <IoIosArrowForward className="transform rotate-0 duration-300" />
                    )}
                </span>
            </button>
            <div
                className={`relative left-10 bg-white overflow-hidden transition-all duration-500 ease-in-out ${isDrawerOpen
                    ? " max-h-[300px] opacity-100"
                    : "max-h-0 opacity-0"
                    }`}
            >
                {element.dynamic === false
                    ? <FilterList filterValue={element.filterValue} addFilterValue={addFilterValue} mapKey={element.key} selectedValues={selectedValues}/>
                    : <SearchFilter meta={element.filterValue.meta} addFilterValue={addFilterValue} mapKey={element.key} />}
            </div>
        </>
    )
}

export default Drawer