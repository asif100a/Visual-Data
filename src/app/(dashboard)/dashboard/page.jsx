"use client"
import useUser from '@/app/(components)/Hooks/useUser';
import Sidebar from '@/app/(components)/UI-parts/Sidebar';
import { supabase } from '@/app/(lib)/helper/superbase';
import { useRouter } from 'next/navigation';
import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Dashboard = () => {
  const user = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error.message);
    } else {
      router.push('/login');
    }
  };

  const percentage = 66;

  if (!user || user === 'Auth session missing!') {
    return router.push('/login');
  }

  return (
    <section className='flex gap-6'>
      <Sidebar
        user={user}
        handleLogout={handleLogout}
      />

      {/* Radial Progress */}
      <div className='my-6'>
        <div className='p-6 bg-white rounded-2xl shadow-md w-56 h-auto'>
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
    </section>
  )
}

export default Dashboard