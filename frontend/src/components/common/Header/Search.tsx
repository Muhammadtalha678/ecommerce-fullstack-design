import React from 'react'

const Search = () => {
    return (
        <div className="w-full lg:w-auto flex justify-center">
            <div className="flex w-full lg:w-[600px]">
                <input
                    type="text"
                    placeholder="Search"

                    className="p-2 border rounded-l-md w-full custom-font-regular text-[16px]"
                />
                <select className="border p-2 custom-font-regular text-[16px]">
                    <option>All category</option>
                    <option>Electronics</option>
                    <option>Fashion</option>
                </select>
                <button className="bg-blue-500 text-white px-4 rounded-r-md custom-font-medium text-[16px">Search</button>
            </div>
        </div>
    )
}

export default Search
