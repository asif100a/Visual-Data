import React from 'react'

const Buttons = ({ handleAddViewModal, handleUpdateViewModal, handleShowDeleteModal }) => {
    return (
        <div className='w-fit h-fit flex flex-col justify-center items-center gap-6 mt-3 md:mt-0'>
            <div className='flex flex-row gap-6'>
                {/* Add student button */}
                <button
                    onClick={handleAddViewModal}
                    className='border rounded-md px-3 py-1 text-sm md:text-lg font-bold text-[#7bc095] bg-[#82ca9d33]'
                >Add Student</button>
                {/* update student button */}
                <button
                    onClick={handleUpdateViewModal}
                    className='border rounded-md px-3 py-1 text-sm md:text-lg font-bold text-[#8884d8] bg-[#8884d833]'
                >Update Student</button>
            </div>
            {/* delete student button */}
            <button
                onClick={handleShowDeleteModal}
                className='border rounded-md px-3 py-1 text-sm md:text-lg font-bold text-[#ef4444] bg-[#ef444433]'
            >Delete Student</button>
        </div>
    )
}

export default Buttons
