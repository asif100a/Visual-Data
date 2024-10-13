"use client"
import React from 'react';
import StudentTable from './StudentTable';

const UpdateStudentModal = ({
    students,
    handleCloseUpdateModal,
    handleUpdateStudent,
    tableRefForUpdate,
    formRef,
    handleSelectStudentForUpdate,
    selectedStudentForUpdate,
    widgetRef
}) => {
    // console.log(selectedStudentForUpdate);

    const from = 'update';

    return (
        <div className="bg-white shadow-md rounded-2xl w-full max-w-lg p-6">
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
                {/* Student Table */}
                <div ref={widgetRef} className=''>
                    <StudentTable
                        tableRefForUpdate={tableRefForUpdate}
                        students={students}
                        handleSelectStudentForUpdate={handleSelectStudentForUpdate}
                        handleCloseUpdateModal={handleCloseUpdateModal}
                        from={from}
                    />
                </div>

                {/* Update Field */}
                <form
                    ref={formRef}
                    onSubmit={handleUpdateStudent}
                    className="w-full mt-6 space-y-3 hidden"
                >
                    {/* First Name */}
                    <div>
                        <label htmlFor="name">{"Student's"} Name</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={selectedStudentForUpdate?.name}
                            className="w-full border px-6 py-3 rounded-md focus:outline-none"
                            required={true}
                        />
                    </div>
                    <div>
                        <label htmlFor="roll">Roll</label>
                        <input
                            type="number"
                            name="roll"
                            defaultValue={selectedStudentForUpdate?.roll}
                            className="w-full border px-6 py-3 rounded-md focus:outline-none"
                            required={true}
                        />
                    </div>
                    {/* Marks */}
                    <div>
                        <label htmlFor="marks">Marks</label>
                        <input
                            type="number"
                            name="marks"
                            defaultValue={selectedStudentForUpdate?.marks}
                            className="w-full border px-6 py-3 rounded-md focus:outline-none"
                            required={true}
                        />
                    </div>
                    {/* Submit button */}
                    <div className='flex justify-between'>
                        <input
                            type="submit"
                            value="Update"
                            className='border rounded-md px-3 py-1 text-lg font-bold hover:cursor-pointer bg-green-600 text-white'
                        />

                        <button
                            type='button'
                            onClick={handleCloseUpdateModal}
                            className='border rounded-md px-3 py-1 text-lg font-bold bg-orange-600 text-white'
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateStudentModal;