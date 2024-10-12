import React from 'react'

const Buttons = ({ handleAddViewModal, handleUpdateViewModal }) => {
    return (
        <div className='w-fit h-fit flex flex-col justify-center items-center gap-6'>
            <div className='flex flex-row gap-6'>
                {/* Add student button */}
                <button
                    onClick={handleAddViewModal}
                    className='border rounded-md px-3 py-1 text-lg font-bold'
                >Add Student</button>
                {/* update student button */}
                <button
                    onClick={handleUpdateViewModal}
                    className='border rounded-md px-3 py-1 text-lg font-bold'
                >Update Student</button>
            </div>
            {/* delete student button */}
            <button
                onClick={''}
                className='border rounded-md px-3 py-1 text-lg font-bold'
            >Delete Student</button>
        </div>
    )
}

export default Buttons
