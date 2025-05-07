import React from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const PageNavigator = ({page, totalPages, setPage}) => {

    const handlePage = (page) => {
        if (page >= 1 && page <= totalPages) {
            console.log("page: " + page);
            console.log("Total Pages: " + totalPages);
            setPage(page);
        }
    }
    return (
        <div className="flex justify-between pt-5 items-center text-[13px] w-full">
            <button
                className={`px-3 py-2 rounded-md bg-green-800 text-white flex items-center gap-1 ${page === 1 ? "cursor-not-allowed bg-green-800/70" : "cursor-pointer"}`}
                onClick={() => handlePage(page - 1)} disabled={page === 1}
            >
                <GrFormPrevious />  <span className='md:block hidden'>  Prev </span>
            </button>
            <p className="">
                Showing Page {page} of {totalPages}
            </p>
            <button
                className={`px-3 py-2 rounded-md bg-green-800 text-white flex items-center gap-1 ${page === totalPages ? "cursor-not-allowed bg-green-800/70" : "cursor-pointer"} `}
                onClick={() => handlePage(page + 1)}
                disabled={page === totalPages}
            >
               <span className='md:block hidden'> Next </span> <GrFormNext />
            </button>
        </div>
    )
}

export default PageNavigator