import React from 'react'
import { BiSort } from "react-icons/bi";
import { ASC, DESC } from '../utils/constants';

const HeaderList = ({ headersList, sort, setSort }) => {

    const handleSort = (sortField) => {
        if (sort.sortBy !== sortField) {
            setSort({ sortBy: sortField, order: ASC })
        }
        else {
            const order = sort.order === ASC ? DESC : ASC
            setSort({ sortBy: sortField, order })
        }
    }

    return (
        <thead className='font-bold'>
            <tr>
                {headersList.map((header, index) => (
                    <th key={index} className='border p-2 bg-gray-200'>
                        <span className='flex items-center gap-2 '>
                            {header.title}
                            {header.onClickFunc && (<span onClick={() => handleSort(header.keyName)}
                                className='cursor-pointer'><BiSort size={15} /></span>
                            )}
                        </span>
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export default HeaderList