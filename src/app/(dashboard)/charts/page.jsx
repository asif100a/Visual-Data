"use client"
import useUser from '@/app/(components)/Hooks/useUser';
import AddStudentModal from '@/app/(components)/UI-parts/AddStudentModal';
import BarChartComponent from '@/app/(components)/UI-parts/BarChartComponent';
import LineChartComponent from '@/app/(components)/UI-parts/LineChartComponent';
import PieChartComponent from '@/app/(components)/UI-parts/PieChartComponent';
import Sidebar from '@/app/(components)/UI-parts/Sidebar';
import { supabase } from '@/app/(lib)/helper/superbase';
import { getStudent, insertStudent } from '@/app/api/route';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const ChartsPage = () => {
    const user = useUser();
    const router = useRouter();
    const studentRef = useRef();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // state
    const [students, setStudents] = useState();

    // Fetched data
    useEffect(() => {
        const getData = async () => {
            const data = await getStudent();
            console.log(data);
            setStudents(data);
        };

        getData();
    }, []);

    // Add student to the database
    const handleAddStudent = async (data) => {
        console.log(data);
        const response = await insertStudent({ data });
        console.log(response);
        if (response.status === 201) {
            toast.success("Student has added successfully");
            studentRef.current.classList.add('hidden');
        }
    };

    // Open the add student modal
    const handleViewModal = async () => {

        studentRef.current.classList.remove('hidden');
    };
    // Close the details modal
    const handleCloseModal = () => {
        studentRef.current.classList.add('hidden');
    }

    // Log out user
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log(error.message);
        } else {
            router.push('/login');
        }
    };

    // If user is missing, redirect to Login page
    if (!user || user === 'Auth session missing!') {
        return router.push('/login');
    }

    return (
        <section className='flex gap-6'>
            <Sidebar
                user={user}
                handleLogout={handleLogout}
            />

            <div className='grid grid-cols-2 my-6 gap-6 relative'>
                <div ref={studentRef} className="absolute z-10 w-full h-full flex justify-center items-center hidden">
                    <AddStudentModal
                        handleCloseModal={handleCloseModal}
                        register={register}
                        handleSubmit={handleSubmit}
                        errors={errors}
                        handleAddStudent={handleAddStudent}
                    />
                </div>

                {/* Bar Chart */}
                <div className='border rounded-2xl p-6'>
                    <h1 className='text-xl font-semibold mb-3'>Bar Chart</h1>
                    <div className='w-[500px] h-[350px]'>
                        <BarChartComponent students={students} />
                    </div>
                </div>
                {/* Line Chart */}
                <div className='border rounded-2xl p-6'>
                    <h1 className='text-xl font-semibold mb-3'>Line Chart</h1>
                    <div className='w-[500px] h-[350px]'>
                        <LineChartComponent students={students} />
                    </div>
                </div>
                {/* Pie Chart */}
                <div className='border rounded-2xl p-6'>
                    <h1 className='text-xl font-semibold mb-3'>Pie Chart</h1>
                    <div className='w-[600px] h-[350px]'>
                        <PieChartComponent students={students} />
                    </div>
                </div>
                {/* Button */}
                <div className='flex justify-center items-center'>
                    <button
                        onClick={handleViewModal}
                        className='border rounded-md px-3 py-1 text-lg font-bold'
                    >Add Student</button>
                </div>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </section>
    );
};

export default ChartsPage;