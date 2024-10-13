import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { FiUser } from 'react-icons/fi';

const Widget = () => {
    const percentage = 66;
    
    return (
        <div className='shadow-widget w-fit h-fit px-6 pb-6 pt-3 rounded-xl'>
          <div className='mb-3'>
            <h3 className='text-lg font-semibold'>Student Progress</h3>
          </div>

        {/* Radial Progress */}
          <div className='flex justify-center items-center'>
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
          <div className='text-sm font-bold flex justify-center gap-3 mt-3'>
            <p><span className='text-[#7975c8]'>Roll:</span> <span className='text-gray-600'>10</span></p>
            <p><span className='text-[#f35353]'>Marks:</span> <span className='text-gray-600'>66</span></p>
          </div>

          {/* Student Profile */}
          <div className='flex gap-3 items-center mt-3'>
            <div className='border rounded-full w-fit h-fit p-2 text-[#7bc095] bg-[#82ca9d33]'>
              <FiUser className='text-2xl' />
            </div>
            <div className='flex flex-col'>
              <span className='text-xs font-bold'>Student</span>
              <span className='text-base font-medium'>Micheal</span>
            </div>
          </div>
        </div>
    );
};

export default Widget;