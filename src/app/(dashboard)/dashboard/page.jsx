"use client"
import useUser from '@/app/(components)/Hooks/useUser';
import Sidebar from '@/app/(components)/UI-parts/Sidebar';
import Widget from '@/app/(components)/UI-parts/Widget';
import { supabase } from '@/app/(lib)/helper/superbase';
import { useRouter } from 'next/navigation';
import React from 'react'
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

  if (!user || user === 'Auth session missing!') {
    return router.push('/login');
  }

  return (
    <section className='flex gap-6'>
      <Sidebar
        user={user}
        handleLogout={handleLogout}
      />

      {/* Widgets */}
      <div className='my-6'>
        <Widget />
      </div>
    </section>
  )
}

export default Dashboard