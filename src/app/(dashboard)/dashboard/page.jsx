"use client"
import useUser from '@/app/(components)/Hooks/useUser';
import Sidebar from '@/app/(components)/UI-parts/Sidebar';
import IndividualWidget from '@/app/(components)/UI-parts/IndividualWidget';
import { supabase } from '@/app/(lib)/helper/superbase';
import { deleteStudent, getStudent, insertStudent, updateStudent } from '@/app/api/route';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import 'react-circular-progressbar/dist/styles.css';
import TotalWidget from '@/app/(components)/UI-parts/TotalWidget';
import UpdateStudentModal from '@/app/(components)/UI-parts/UpdateStudentModal';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import AddStudentModal from '@/app/(components)/UI-parts/AddStudentModal';
import { useForm } from 'react-hook-form';
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const Dashboard = () => {
  const user = useUser();
  const router = useRouter();
  const addStudentRef = useRef();
  const updateStudentRef = useRef();
  const tableRefForUpdate = useRef();
  const formRef = useRef();
  const widgetRef = useRef();
  const sidebarRef = useRef();

  // States
  const [students, setStudents] = useState([]);
  const [selectedStudentForUpdate, setSelectedStudentForUpdate] = useState('');

  // Fetched data
  useEffect(() => {
    const getData = async () => {
      const data = await getStudent();
      console.log(data);
      setStudents(data);
    };

    getData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
  const handleUpdateViewModal = async (student) => {
    setSelectedStudentForUpdate(student);

    updateStudentRef.current.classList.remove('hidden');
    widgetRef.current.classList.add('hidden');
    formRef.current.classList.remove('hidden');
  };
  // Close the update modal
  const handleCloseUpdateModal = () => {
    updateStudentRef.current.classList.add('hidden');
  }
  /******************************************** */

  // Handle the logout of the user
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

  if (!user || user === 'Auth session missing!') {
    return router.push('/login');
  }

  return (
    <section className='flex gap-6 relative w-full lg:w-auto overflow-x-hidden'>
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
            selectedStudentForUpdate={selectedStudentForUpdate}
            widgetRef={widgetRef}
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

      <div className='flex-1 relative'>
        {/* Menu bar for small devices */}
        <div className='block lg:hidden '>
          <FaBars onClick={handleOpenSidebar} className='text-lg mt-3 ml-3' />
        </div>

        <div className='py-6 flex flex-col'>
          {/* Total Widgets */}
          <TotalWidget
            students={students}
            handleAddViewModal={handleAddViewModal}
          />

          {/* Individual Widgets */}
          <div className='mt-6 grid grid-cols-2 w-fit mx-auto lg:mx-0 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-6'>
            {
              students?.map(student => (
                <IndividualWidget
                  key={student?.id}
                  student={student}
                  handleUpdateViewModal={handleUpdateViewModal}
                  handleDeleteStudent={handleDeleteStudent}
                />
              ))
            }
          </div>
        </div>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </section>
  )
}

export default Dashboard;