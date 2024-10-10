"use client"
import useUser from '@/app/(components)/Hooks/useUser';
import Sidebar from '@/app/(components)/UI-parts/Sidebar';
import { supabase } from '@/app/(lib)/helper/superbase';
import React, { useEffect, useState } from 'react'

const page = () => {
  const user = useUser();

  console.log("user:", user);

  return (
    <div>
      <Sidebar />
    </div>
  )
}

export default page
