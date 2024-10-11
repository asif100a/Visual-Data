"use client"
import useUser from '@/app/(components)/Hooks/useUser';
import BarChartComponent from '@/app/(components)/UI-parts/BarChartComponent';
import LineChartComponent from '@/app/(components)/UI-parts/LineChartComponent';
import PieChartComponent from '@/app/(components)/UI-parts/PieChartComponent';
import Sidebar from '@/app/(components)/UI-parts/Sidebar';
import { supabase } from '@/app/(lib)/helper/superbase';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const page = () => {
    const user = useUser();
    const router = useRouter();

    // state
    const [students, setStudents] = useState();

    // Fetch the data
    useEffect(() => {
        const fetchStudents = async() => {
            const {data, error} = await supabase.from('Students').select("*", {count: 'exact'});
            if(error) {
                console.log(error.message);
            }
            else{
                setStudents(data);
            }
        };

        fetchStudents();
    }, []);

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

    if (!user || user === 'Auth session missing!') {
        return router.push('/login');
    }

    return (
        <section className='flex gap-6'>
            <Sidebar
                user={user}
                handleLogout={handleLogout}
            />

            <div className='grid grid-cols-2'>
                {/* Bar Chart */}
                <div className='w-[500px] h-[350px]'>
                    {
                        students?.map(student => (
                            <BarChartComponent key={student?.id} student={student} />
                        ))
                    }
                </div>
                {/* Line Chart */}
                <div className='w-[500px] h-[350px]'>
                    <LineChartComponent />
                </div>
                {/* Pie Chart */}
                <div className='w-[600px] h-[350px]'>
                    <PieChartComponent />
                </div>
            </div>
        </section>
    );
};

export default page;