"use client"
import useUser from '@/app/(components)/Hooks/useUser';
import Sidebar from '@/app/(components)/UI-parts/Sidebar';
import IndividualWidget from '@/app/(components)/UI-parts/IndividualWidget';
import { supabase } from '@/app/(lib)/helper/superbase';
import { getStudent } from '@/app/api/route';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import 'react-circular-progressbar/dist/styles.css';
import TotalWidget from '@/app/(components)/UI-parts/TotalWidget';

const Dashboard = () => {
  const user = useUser();
  const router = useRouter();

  // States
  const [students, setStudents] = useState([]);

  // Fetched data
  useEffect(() => {
    const getData = async () => {
      const data = await getStudent();
      console.log(data);
      setStudents(data);
    };

    getData();
  }, []);

  // Handle the logout of the user
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

      <div className='my-6 flex flex-col'>
        {/* Total Widgets */}
        <TotalWidget 
          students={students}
        />

        {/* Individual Widgets */}
        <div className='mt-6 grid grid-cols-6 gap-6'>
          {
            students?.map(student => (
              <IndividualWidget
                key={student?.id}
                student={student}
              />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Dashboard