import React, { useRef, useState } from 'react'
import FilterList from './FilterList'
import { apiClient } from '../api/axios';

const SearchFilter = ({ addFilterValue, meta, mapKey }) => {
    const searchRef = useRef("")
    const [searchResult, setSearchResult] = useState([])
    const searchValue = () => {
        apiClient.get(meta.url + searchRef.current.value)
            .then((response) => {
                console.log(response);
                setSearchResult(response)
            })
            .catch((error) => console.error(error)
            )
    }
    return (
        <>
            <input ref={searchRef} type="text" className='bg-transparent border p-2 rounded-md' onChange={searchValue} placeholder='Search...' />
            <FilterList filterValue={searchResult} addFilterValue={addFilterValue} mapKey={mapKey} jsonKey={meta.key} jsonValue={meta.value} />

        </>
    )
}

export default SearchFilter