"use client"
import React, { useEffect, useState } from 'react'
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";

const ToggleTheme = () => {
    const [isChecked, setIsChecked] = useState(false);
    const handleToggleTheme = (e) => {
        console.log(e.target.checked);
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        if(isChecked) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }

        const theme = localStorage.getItem('theme');
        console.log(theme);

        // Now set the Theme in the html attribute
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [isChecked]);

    return (
        <label htmlFor="toggleTheme" className="flex items-center space-x-2 cursor-pointer dark:text-gray-800">
            <div><CiLight className='w-5 h-auto' /></div>
            <span className="relative">
                <input
                    onClick={handleToggleTheme}
                    id="toggleTheme"
                    checked={isChecked}
                    type="checkbox"
                    value="off"
                    className="hidden peer"
                />
                <div className="w-10 h-6 rounded-full shadow-inner dark:bg-gray-600 peer-checked:dark:bg-[#7bc095]"></div>
                <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto dark:bg-gray-100"></div>
            </span>
            <span><CiDark className='w-5 h-auto' /></span>
        </label>
    )
}

export default ToggleTheme;
