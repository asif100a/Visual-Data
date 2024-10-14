import React from 'react';
import { BsPlusCircleDotted } from "react-icons/bs";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

const TotalWidget = ({ students, handleAddViewModal }) => {

    const getTotalPercentage = () => {
        const totalMarks = students?.reduce((prevMark, currMark) => {
            return prevMark + currMark?.marks
        }, 0);

        const maxMarks = students?.length * 100;
        const percentage = (totalMarks / maxMarks) * 100;
        return Math.ceil(percentage);
    };

    const totalPercentage = getTotalPercentage();
    // console.log(totalPercentage);

    return (
        <div className='border w-[calc(100vw-24px)] md:w-[calc(100vw-48px)] lg:w-fit h-fit mx-auto lg:mx-0 px-3 md:px-6 pb-6 pt-3 rounded-md '>
            <div className='mb-3'>
                <h3 className='text-base font-semibold'>Total Student Progress</h3>
            </div>

            {/* Radial Progress */}
            <div className='flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between items-start md:items-center w-full'>
                <div className='w-24 h-auto'>
                    <CircularProgressbar
                        value={totalPercentage}
                        text={`${totalPercentage}%`}
                        styles={buildStyles({
                            pathColor: `rgba(217, 70, 239, ${totalPercentage / 100})`,
                            textColor: '#f88',
                            trailColor: '#d6d6d6',
                            backgroundColor: '#3e98c7',
                        })} />
                </div>

                <div className='w-full md:w-1/2 ml-9 md:ml-0 flex justify-normal md:justify-center items-center'>
                    <button
                        title='Add Student'
                        onClick={handleAddViewModal}
                        className='text-[#7bc095] flex flex-col items-center'
                    >
                        <span><BsPlusCircleDotted className='text-2xl' /></span>
                        <span className='text-xs'>Add</span>
                    </button>
                </div>
            </div>

            {/* Roll and Marks */}
            <div className='text-sm font-bold flex justify-start gap-3 mt-3'>
                <p><span className=''>Total Student:</span> <span className='text-gray-600'>{students?.length}</span></p>
            </div>

            {/* Student Table */}
            <div className='mt-3 h-[200px] w-full md:w-full overflow-y-auto overflow-x-auto'>
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-th">
                        <tr>
                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                                <span>No.</span>
                            </th>
                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                                <span>Student Name</span>
                            </th>

                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right">
                                Roll
                            </th>

                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                                Marks
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-inherit divide-y divide-gray-200">
                        {
                            students?.map((student, i) => (
                                <tr key={student?.id}>
                                    <td className='pl-3'>{i + 1}</td>
                                    <td className="px-12 py-4 text-sm font-normal whitespace-nowrap">
                                        <span>{student?.name}</span>
                                    </td>
                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                        <span>{student?.roll}</span>
                                    </td>
                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
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