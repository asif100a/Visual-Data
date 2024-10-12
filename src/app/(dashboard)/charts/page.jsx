"use client"
import useUser from '@/app/(components)/Hooks/useUser';
import AddStudentModal from '@/app/(components)/UI-parts/AddStudentModal';
import BarChartComponent from '@/app/(components)/UI-parts/BarChartComponent';
import Buttons from '@/app/(components)/UI-parts/Buttons';
import DeleteStudentModal from '@/app/(components)/UI-parts/DeleteStudentModal';
import LineChartComponent from '@/app/(components)/UI-parts/LineChartComponent';
import PieChartComponent from '@/app/(components)/UI-parts/PieChartComponent';
import Sidebar from '@/app/(components)/UI-parts/Sidebar';
import UpdateStudentModal from '@/app/(components)/UI-parts/UpdateStudentModal';
import { supabase } from '@/app/(lib)/helper/superbase';
import { getStudent, insertStudent, updateStudent } from '@/app/api/route';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const ChartsPage = () => {
    const user = useUser();
    const router = useRouter();
    const addStudentRef = useRef();
    const updateStudentRef = useRef();
    const deleteStudentRef = useRef();
    const tableRefForUpdate = useRef();
    const tableRefForDelete = useRef();
    const formRef = useRef();
    // state
    const [students, setStudents] = useState();
    const [selectedStudent, setSelectedStudent] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

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
            addStudentRef.current.classList.add('hidden');
            window.location.reload();
        }
    };


    const handleSelectStudentForDelete = (student) => {
        console.log(student);

        deleteStudentRef.current.classList.add('hidden');
    };

    const handleSelectStudentForUpdate = (student) => {
        console.log(student);
        setSelectedStudent(student);

        // After selected student, hide the table and show the form
        tableRefForUpdate.current.classList.add('hidden');
        console.log(tableRefForUpdate.current);
        formRef.current.classList.remove('hidden');
    };

    // Update student to the database
    const handleUpdateStudent = async (e) => {
        e.preventDefault();
        // console.log(e);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const roll = formData.get("roll");
        const marks = formData.get("marks");
        console.table({ name, roll, marks });

        const id = selectedStudent?.id;
        const newData = { name, roll, marks };

        // Update the data
        const response = await updateStudent({ id, newData });
        console.log(response);
        if (response?.status === 204) {
            toast.success('The student updated successfully');
            updateStudentRef.current.classList.add('hidden');
            window.location.reload();
        }
    };

    // Delete student from the database
    const handleDeleteStudent = () => {

    };

    /** *** Add Student Modal Action *** */
    // Open the add student modal
    const handleAddViewModal = async () => {

        addStudentRef.current.classList.remove('hidden');
    };
    // Close the details modal
    const handleCloseAddModal = () => {
        addStudentRef.current.classList.add('hidden');
    }
    /******************************************** */

    /** *** Update Student Modal Action *** */
    // Open the update student modal
    const handleUpdateViewModal = async () => {

        updateStudentRef.current.classList.remove('hidden');
    };
    // Close the update modal
    const handleCloseUpdateModal = () => {
        updateStudentRef.current.classList.add('hidden');
    }
    /******************************************** */

    /** *** Update Student Modal Action *** */
    // Show delete student modal
    const handleShowDeleteModal = async () => {
        deleteStudentRef.current.classList.remove('hidden');
    };

    // Close delete student modal
    const handleCloseDeleteModal = () => {
        deleteStudentRef.current.classList.add('hidden');
    };
    /******************************************** */

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
        <section className='flex gap-6 relative'>
            <aside className='sticky z-10'>
                <Sidebar
                    user={user}
                    handleLogout={handleLogout}
                />
            </aside>

            <div className='grid grid-cols-2 my-6 gap-6 relative'>
                <div ref={addStudentRef} className="absolute z-10 w-full h-full flex justify-center items-center hidden">
                    <AddStudentModal
                        handleCloseAddModal={handleCloseAddModal}
                        register={register}
                        handleSubmit={handleSubmit}
                        errors={errors}
                        handleAddStudent={handleAddStudent}
                    />
                </div>
                <div ref={updateStudentRef} className="absolute z-10 w-full h-full flex justify-center items-center hidden">
                    <UpdateStudentModal
                        students={students}
                        handleCloseUpdateModal={handleCloseUpdateModal}
                        handleUpdateStudent={handleUpdateStudent}
                        tableRefForUpdate={tableRefForUpdate}
                        formRef={formRef}
                        handleSelectStudentForUpdate={handleSelectStudentForUpdate}
                        selectedStudent={selectedStudent}
                    />
                </div>
                <div ref={deleteStudentRef} className="absolute z-10 w-full h-full flex justify-center items-center hidden">
                    <DeleteStudentModal
                        tableRefForDelete={tableRefForDelete}
                        students={students}
                        handleSelectStudentForDelete={handleSelectStudentForDelete}
                        handleCloseDeleteModal={handleCloseDeleteModal}
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
                    <Buttons
                        handleAddViewModal={handleAddViewModal}
                        handleUpdateViewModal={handleUpdateViewModal}
                        handleShowDeleteModal={handleShowDeleteModal}
                    />
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