"use client"
import React, { useRef, useState } from 'react';

const UpdateStudentModal = ({ 
    students, 
    handleCloseUpdateModal, 
    handleUpdateStudent, 
    tableRef,
    formRef,
    handleSelectStudent,
    selectedStudent
}) => {    

    return (
        <div className="bg-white shadow-md rounded-2xl w-full max-w-lg p-6">
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
                <h2 className="mb-4 text-lg font-semibold leading-tight">Select which student do you want to update</h2>
                {/* Student Table */}
                <div ref={tableRef} className="overflow-x-auto">
                    <table className="w-full p-6 text-xs text-left whitespace-nowrap">
                        <colgroup>
                            <col className="w-5" />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col className="w-5" />
                        </colgroup>
                        <thead className='border-b-2'>
                            <tr>
                                <th className="p-3">Id</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Roll</th>
                                <th className="p-3">Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                students?.map(student => (
                                    <tr
                                        key={student?.id}
                                        onClick={() => handleSelectStudent(student)}
                                        className='border-b w-fit hover:bg-slate-100 hover:cursor-pointer'
                                    >
                                        <td className="px-3 py-2">
                                            <p>{student?.id}</p>
                                        </td>
                                        <td className="px-3 py-2">
                                            <p>{student?.name}</p>
                                        </td>
                                        <td className="px-3 py-2">
                                            <p>{student?.roll}</p>
                                        </td>
                                        <td className="px-3 py-2">
                                            <p>{student?.marks}</p>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    <div className='flex justify-center items-center mt-3'>
                        <button
                            type='button'
                            onClick={handleCloseUpdateModal}
                            className='border rounded-md px-3 py-1 text-xs font-bold bg-orange-600 text-white'
                        >
                            Cancel
                        </button>
                    </div>
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
                            defaultValue={selectedStudent?.name}
                            className="w-full border px-6 py-3 rounded-md focus:outline-none"
                            required={true}
                        />
                    </div>
                    <div>
                        <label htmlFor="roll">Roll</label>
                        <input
                            type="number"
                            name="roll"
                            defaultValue={selectedStudent?.roll}
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
                            defaultValue={selectedStudent?.marks}
                            className="w-full border px-6 py-3 rounded-md focus:outline-none"
                            required={true}
                        />
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