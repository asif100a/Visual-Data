"use client"
import useUser from '@/app/(components)/Hooks/useUser';
import Sidebar from '@/app/(components)/UI-parts/Sidebar';
import IndividualWidget from '@/app/(components)/UI-parts/IndividualWidget';
import { supabase } from '@/app/(lib)/helper/superbase';
import { deleteStudent, getStudent, updateStudent } from '@/app/api/route';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import 'react-circular-progressbar/dist/styles.css';
import TotalWidget from '@/app/(components)/UI-parts/TotalWidget';
import UpdateStudentModal from '@/app/(components)/UI-parts/UpdateStudentModal';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const user = useUser();
  const router = useRouter();
  const updateStudentRef = useRef();
  const tableRefForUpdate = useRef();
  const formRef = useRef();
  const widgetRef = useRef();

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

  if (!user || user === 'Auth session missing!') {
    return router.push('/login');
  }

  return (
    <section className='flex gap-6'>
      <Sidebar
        user={user}
        handleLogout={handleLogout}
      />

      <div className='relative'>
        <div ref={updateStudentRef} className="absolute z-10 w-full h-full flex justify-center items-center hidden">
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

export default Dashboard