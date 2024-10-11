import React from 'react'

const AddStudentModal = ({ handleCloseModal, register, handleSubmit, errors, handleAddStudent }) => {

    return (
        <div className="bg-white shadow-md rounded-2xl w-full max-w-lg p-6">
            <form onSubmit={handleSubmit(handleAddStudent)} className="w-full mt-6 space-y-3">
                {/* First Name */}
                <div>
                    <label htmlFor="name">{"Student's"} Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Student's Name"
                        className="w-full border px-6 py-3 rounded-md focus:outline-none"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <span className="text-[#F33823]">This field is required</span>}
                </div>
                <div>
                    <label htmlFor="roll">Roll</label>
                    <input
                        type="number"
                        name="roll"
                        placeholder="Roll"
                        className="w-full border px-6 py-3 rounded-md focus:outline-none"
                        {...register("roll", { required: true })}
                    />
                    {errors.roll && <span className="text-[#F33823]">This field is required</span>}
                </div>
                {/* Marks */}
                <div>
                    <label htmlFor="marks">Marks</label>
                    <input
                        type="number"
                        name="marks"
                        placeholder="Marks"
                        className="w-full border px-6 py-3 rounded-md focus:outline-none"
                        {...register("marks", { required: true })}
                    />
                    {errors.marks && <span className="text-[#F33823]">This field is required</span>}
                </div>
                {/* Submit button */}
                <div className='flex justify-between'>
                    <input
                        type="submit"
                        value="Add"
                        className='border rounded-md px-3 py-1 text-lg font-bold hover:cursor-pointer bg-green-600 text-white'
                    />

                    <button
                        type='button'
                        onClick={handleCloseModal}
                        className='border rounded-md px-3 py-1 text-lg font-bold bg-orange-600 text-white'
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddStudentModal
