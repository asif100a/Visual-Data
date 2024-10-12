import React from 'react'
import StudentTable from './StudentTable'

const DeleteStudentModal = ({
    tableRefForDelete,
    students,
    handleCloseDeleteModal,
    handleSelectStudentForDelete
}) => {

    return (
        <div className="bg-white shadow-md rounded-2xl w-full max-w-lg p-6">
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
                <h2 className="mb-4 text-lg font-semibold leading-tight">Select that student you want to delete</h2>
            </div>
            {/* Student Table */}
            <StudentTable
                tableRefForDelete={tableRefForDelete}
                students={students}
                handleSelectStudentForDelete={handleSelectStudentForDelete}
                handleCloseDeleteModal={handleCloseDeleteModal}
            />
        </div>
    )
}

export default DeleteStudentModal
