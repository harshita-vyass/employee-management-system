import React from 'react'

const FilterList = ({ filterValue, addFilterValue, mapKey, jsonKey = "key", jsonValue = "value", selectedValues }) => {

    return (
        (Array.from(filterValue).map((filterValue, index) => (
            <label key={index} className="flex items-center gap-2">
                <input
                    checked={selectedValues[mapKey] && selectedValues[mapKey].includes(filterValue[jsonKey])}
                    type="checkbox"
                    value={filterValue[jsonKey]}
                    onChange={(e) => addFilterValue(e, mapKey)}
                />
                <p> {filterValue[jsonValue]}</p> 
            </label>
        )))
    )
}

export default FilterList