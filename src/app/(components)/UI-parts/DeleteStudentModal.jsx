import React from 'react'
import StudentTable from './StudentTable'

const DeleteStudentModal = ({
    tableRefForDelete,
    students,
    handleCloseDeleteModal,
    handleSelectStudentForDelete
}) => {

    const from = 'delete';

    return (
        <div className="bg-white shadow-md rounded-2xl w-full max-w-lg p-6">
            {/* Student Table */}
            <StudentTable
                tableRefForDelete={tableRefForDelete}
                students={students}
                handleSelectStudentForDelete={handleSelectStudentForDelete}
                handleCloseDeleteModal={handleCloseDeleteModal}
                from={from}
            />
        </div>
    )
}

export default DeleteStudentModal
