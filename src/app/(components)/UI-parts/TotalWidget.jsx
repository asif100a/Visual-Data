import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

const TotalWidget = ({ students }) => {
    const percentage = 88;

    return (
        <div className='border hover:cursor-pointer w-fit h-fit px-6 pb-6 pt-3 rounded-md'>
            <div className='mb-3'>
                <h3 className='text-base font-semibold'>Total Student Progress</h3>
            </div>

            {/* Radial Progress */}
            <div className='flex justify-start items-center'>
                <div className='w-24 h-auto'>
                    <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        styles={buildStyles({
                            // Colors
                            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
                            textColor: '#f88',
                            trailColor: '#d6d6d6',
                            backgroundColor: '#3e98c7',
                        })} />
                </div>
            </div>

            {/* Roll and Marks */}
            <div className='text-sm font-bold flex justify-start gap-3 mt-3'>
                <p><span className=''>Total Student:</span> <span className='text-gray-600'>{students?.length}</span></p>
            </div>

            {/* Student Table */}
            <div className='mt-3 h-[200px] overflow-y-auto'>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                <span>No.</span>
                            </th>
                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                <span>Student Name</span>
                            </th>

                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                Roll
                            </th>

                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                Marks
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {
                            students?.map((student, i) => (
                                <tr key={student?.id}>
                                    <td className='pl-3'>{i+1}</td>
                                    <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                                        <span>{student?.name}</span>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                        <span>{student?.roll}</span>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                        <span>{student?.marks}</span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default TotalWidget;