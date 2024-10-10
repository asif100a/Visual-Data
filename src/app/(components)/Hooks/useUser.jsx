"use client"
import { supabase } from '@/app/(lib)/helper/superbase';
import React, { useState, useEffect } from 'react';

const useUser = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const getUser = async() => {
            const {data, error} = await supabase.auth.getUser();
            if(error) {
                setUser(error.message);
            } else{
                setUser(data?.user);
            }
        };
        
        getUser();
    }, []);

    return user;
};

export default useUser;