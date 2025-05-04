import React, { useEffect, useState } from "react";
import Drawer from "./Drawer";

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
        const updatedValue = prev[key].filter((pre) => pre !== value)
        if (updatedValue.length === 0) {
          delete prev[key]
          return prev
        }
        return {
        ...prev,
        [key]: updatedValue
      }}
      );
    }


  };

  const filters = () => JSON.parse(localStorage.getItem("filters"));
  return (
    <>
      <div className="relative inline-block ">
        {openFilter && (
          <div className="fixed inset-0 flex items-center justify-center z-[99] ">
            <div
              className="absolute bg-black/65 inset-0 "
              onClick={toggleFilter}
            ></div>
            <div className="rounded-md text-black py-2  bg-white  w-[30%] mx-auto absolute right-0 h-[100dvh] z-[9999] overflow-y-auto flex flex-col justify-between">
              <div className="space-y-3">
                <h2 className="text-xl font-bold ml-5 mb-5 ">Filters</h2>
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
              <button
                className="text-white bg-green-800 w-[96%] py-2 mx-auto mt-5"
                onClick={() => {
                  applyFilters(filterValue);
                }}
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FilterSection;
