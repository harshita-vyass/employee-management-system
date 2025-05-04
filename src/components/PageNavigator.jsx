import React from 'react'

const PageNavigator = ({page, totalPages, setPage}) => {

    const handlePage = (page) => {
        if (page >= 1 && page <= totalPages) {
            console.log("page: " + page);
            console.log("Total Pages: " + totalPages);
            setPage(page);
        }
    }
    return (
        <div className="flex justify-between pt-5 items-center text-[13px] w-[95%]">
            <button
                className={`px-3 py-2 rounded-md bg-green-800 text-white ${page === 1 ? "cursor-not-allowed bg-green-800/70" : "cursor-pointer"}`}
                onClick={() => handlePage(page - 1)} disabled={page === 1}
            >
                Prev
            </button>
            <p className="">
                Showing Page {page} of {totalPages}
            </p>
            <button
                className={`px-3 py-2 rounded-md bg-green-800 text-white ${page === totalPages ? "cursor-not-allowed bg-green-800/70" : "cursor-pointer"} `}
                onClick={() => handlePage(page + 1)}
                disabled={page === totalPages}
            >
                Next
            </button>
        </div>
    )
}

export default PageNavigator