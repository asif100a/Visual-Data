import React from 'react';

const StudentTable = ({
    tableRefForUpdate, 
    tableRefForDelete,
    students, 
    handleSelectStudentForUpdate, 
    handleSelectStudentForDelete,
    handleCloseUpdateModal, 
    handleCloseDeleteModal,
    from
}) => {
    return (
        <div ref={tableRefForUpdate || tableRefForDelete} className="overflow-x-auto">
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
                                onClick={() => {
                                    if(from === 'update') {
                                        handleSelectStudentForUpdate(student);
                                    }
                                    else{
                                        handleSelectStudentForDelete(student?.id);
                                    }
                                }}
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
                    onClick={handleCloseUpdateModal || handleCloseDeleteModal}
                    className='border rounded-md px-3 py-1 text-xs font-bold bg-orange-600 text-white'
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default StudentTable;