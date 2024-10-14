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
import { deleteStudent, getStudent, insertStudent, updateStudent } from '@/app/api/route';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { FaBars } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';
import Swal from 'sweetalert2';

const ChartsPage = () => {
    const user = useUser();
    const router = useRouter();
    const addStudentRef = useRef();
    const updateStudentRef = useRef();
    const deleteStudentRef = useRef();
    const tableRefForUpdate = useRef();
    const tableRefForDelete = useRef();
    const formRef = useRef();
    const sidebarRef = useRef();

    // state
    const [students, setStudents] = useState([]);
    const [selectedStudentForUpdate, setSelectedStudentForUpdate] = useState('');

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

    const handleSelectStudentForUpdate = (student) => {
        console.log(student);
        setSelectedStudentForUpdate(student);

        // After selected student, hide the table and show the form
        tableRefForUpdate.current.classList.add('hidden');
        console.log(tableRefForUpdate.current);
        formRef.current.classList.remove('hidden');
    };

    const handleSelectStudentForDelete = (studentId) => {

        // After selected student, hide the table and call the delete function
        deleteStudentRef.current.classList.add('hidden');
        handleDeleteStudent(studentId);
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

        const id = selectedStudentForUpdate?.id;
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
    const handleDeleteStudent = (studentId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                // console.log(studentId);

                // Delete the student
                const response = await deleteStudent({ studentId });
                console.log(response);
                if (response?.status === 204) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    window.location.reload();
                }
            }
        });
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

    // Handle Open sidebar for small device
    const handleOpenSidebar = () => {
        sidebarRef.current.classList.remove('sticky');
        sidebarRef.current.classList.remove('hidden');
        sidebarRef.current.classList.add('absolute');
        sidebarRef.current.classList.add('z-10');
    };

    // Handle Close sidebar for small device
    const handleCloseSidebar = () => {
        sidebarRef.current.classList.add('sticky');
        sidebarRef.current.classList.add('hidden');
        sidebarRef.current.classList.remove('absolute');
        sidebarRef.current.classList.remove('z-10');
    };

    // If user is missing, redirect to Login page
    if (!user || user === 'Auth session missing!') {
        return router.push('/login');
    }

    return (
        <section className='flex gap-6 relative overflow-hidden'>
            <div ref={addStudentRef} className="absolute z-10 w-full h-full bg-gray-500 bg-opacity-25 hidden">
                <div className='w-full h-screen flex justify-center items-center'>
                    <AddStudentModal
                        handleCloseAddModal={handleCloseAddModal}
                        register={register}
                        handleSubmit={handleSubmit}
                        errors={errors}
                        handleAddStudent={handleAddStudent}
                    />
                </div>
            </div>
            <div ref={updateStudentRef} className="absolute z-10 w-full h-full bg-gray-500 bg-opacity-25 hidden">
                <div className='w-full h-screen flex justify-center items-center'>
                    <UpdateStudentModal
                        students={students}
                        handleCloseUpdateModal={handleCloseUpdateModal}
                        handleUpdateStudent={handleUpdateStudent}
                        tableRefForUpdate={tableRefForUpdate}
                        formRef={formRef}
                        handleSelectStudentForUpdate={handleSelectStudentForUpdate}
                        selectedStudentForUpdate={selectedStudentForUpdate}
                    />
                </div>
            </div>
            <div ref={deleteStudentRef} className="absolute z-10 w-full h-full bg-gray-500 bg-opacity-25 hidden">
                <div className='w-full h-screen flex justify-center items-center'>
                    <DeleteStudentModal
                        tableRefForDelete={tableRefForDelete}
                        students={students}
                        handleSelectStudentForDelete={handleSelectStudentForDelete}
                        handleCloseDeleteModal={handleCloseDeleteModal}
                    />
                </div>
            </div>

            {/* Sidebar */}
            <aside ref={sidebarRef} className='sticky top-0 w-screen lg:w-auto h-screen hidden lg:flex bg-gray-400 lg:bg-white bg-opacity-25 lg:bg-opacity-100'>
                <div className='bg-white w-fit'>
                    <div className='block lg:hidden pt-3 pl-3'>
                        <RxCross2 onClick={handleCloseSidebar} className='text-2xl' />
                    </div>

                    <Sidebar
                        user={user}
                        handleLogout={handleLogout}
                    />
                </div>
            </aside>

            <div>
                {/* Menu bar for small devices */}
                <div className='block lg:hidden'>
                    <FaBars onClick={handleOpenSidebar} className='text-lg mt-3 ml-3' />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 my-6 gap-3 md:gap-6 relative'>
                    {/* Bar Chart */}
                    <div className='border rounded-2xl p-3 md:p-6'>
                        <h1 className='text-base lg:text-xl font-semibold mb-3'>Bar Chart</h1>
                        <div className='w-[320px] lg:w-[500px] h-[220px] lg:h-[350px] mx-auto'>
                            <BarChartComponent students={students} />
                        </div>
                    </div>
                    {/* Line Chart */}
                    <div className='border rounded-2xl p-3 md:p-6'>
                        <h1 className='text-xl font-semibold mb-3'>Line Chart</h1>
                        <div className='w-[350px] lg:w-[500px] h-[220px] lg:h-[350px] mx-auto'>
                            <LineChartComponent students={students} />
                        </div>
                    </div>
                    {/* Pie Chart */}
                    <div className='border rounded-2xl p-6'>
                        <h1 className='text-xl font-semibold mb-3'>Pie Chart</h1>
                        <div className='w-full lg:w-[600px] h-[350px]'>
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
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </section>
    );
};

export default ChartsPage;