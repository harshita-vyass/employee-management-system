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
        <ul className='border-b  text-lg overflow-y-auto  flex  w-[95%]  justify-between font-bold'>
            {headersList.map((header,index) => (
                <li key={index} className={`flex items-center gap-2  min-w-${header.width} `}>{header.title}
                    {header.onClickFunc && (<span onClick={() => handleSort(header.keyName)}
                        className='cursor-pointer'><BiSort size={15} /></span>
                    )}
                </li>
            ))}
        </ul>
    )
}

export default HeaderList