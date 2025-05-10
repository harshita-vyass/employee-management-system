import React, { useEffect, useState } from "react";
import Drawer from "./Drawer";
import { IoClose } from "react-icons/io5";

const FilterSection = ({ openFilter, toggleFilter, applyFilters, pageName }) => {
  const [filterValue, setFilterValue] = useState({});

  // only for logging, to be removed
  useEffect(() => console.log("Existing Filter :", filterValue), [filterValue])

  const addFilterValue = (e, key) => {

    const { value, checked } = e.target;
    console.log("filter field: ", key)
    console.log("Selected key :" + value)

    if (checked) {
      console.log("checked")
      setFilterValue((prev) => {
        const existingValue = prev[key] ? prev[key] : []
        return {
          ...prev,
          [key]: [...existingValue, value],
        }
      });
    } else {
      console.log("unchecked")
      setFilterValue((prev) => {
        const updatedValue = prev[key]?.filter((pre) => pre !== value)
        if (updatedValue?.length === 0) {
          delete prev[key]
          return prev
        }
        return {
          ...prev,
          [key]: updatedValue
        }
      }
      );
    }


  };


  const filters = () => JSON.parse(localStorage.getItem("filters"));

 const resetFilter = () => {
    setFilterValue({});
  }
  return (
    <>
      <div className="relative inline-block ">
        {openFilter && (
          <div className="fixed inset-0 flex items-center justify-center z-[99] ">
            <div
              className="absolute bg-black/65 inset-0 "
              onClick={toggleFilter}
            ></div>
            <div className="rounded-md text-black py-2  bg-white  lg:w-[30%] md:w-[60%] w-[80%] mx-auto absolute right-0 h-[100dvh] z-[9999] overflow-y-auto flex flex-col justify-between">
              <div className="space-y-3 ">
                <div className="flex justify-between items-center xl:px-5 px-2 ">
                  <h2 className="text-xl font-bold ">Filters</h2>
                  <p className="cursor-pointer" onClick={() => {
                    applyFilters(filterValue);
                  }}><IoClose size={25} /></p>
                </div>
                {filters()
                  .filter(elem => elem.applicablePages.includes(pageName))
                  .map((elem, index) => (
                    <div key={index}>
                      <Drawer
                        idx={index}
                        element={elem}
                        addFilterValue={addFilterValue}
                        selectedValues={filterValue}
                      />
                    </div>
                  ))}
              </div>
              <div className="flex justify-between items-center w-full mx-auto">
                <button
                  className="text-white bg-green-800 w-[48%] py-2 mx-auto mt-5"
                  onClick={() => {
                    applyFilters(filterValue);
                  }}
                >
                  Apply
                </button>
                <button
                  className="text-white bg-black w-[48%] py-2 mx-auto mt-5"
                  onClick={() => {
                    resetFilter();
                    applyFilters({});
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FilterSection;
