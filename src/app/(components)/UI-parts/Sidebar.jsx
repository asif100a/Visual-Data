import Link from 'next/link';
import React from 'react'
import { BiLogOut } from "react-icons/bi";
import { MdOutlineHome } from "react-icons/md";

const Sidebar = ({ user, handleLogout }) => {

    return (
        <div className="sticky flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-inherit border-r rtl:border-r-0 rtl:border-l">
            <div className="px-3 py-1 border rounded-md overflow-clip">
                <h4 className="pr-3">{user?.email}</h4>
            </div>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="-mx-3 space-y-6 ">
                    <div className="space-y-3 ">
                        <label className="px-3 text-xs uppercase">Visual Data</label>

                        {/* Home */}
                        <Link href="/dashboard" className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700">
                            <MdOutlineHome className="w-5 h-5" />

                            <span className="mx-2 text-sm font-medium">Home</span>
                        </Link>
                        {/* Charts */}
                        <Link href="/charts" className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                            </svg>

                            <span className="mx-2 text-sm font-medium">Charts</span>
                        </Link>
                    </div>

                    <div className='pt-12'>
                        <hr className='mb-3' />

                        <a onClick={handleLogout} className="flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700" href="">
                            <button className="flex">
                                <span><BiLogOut className="w-5 h-5" /></span>
                                <span className="mx-2 text-sm font-medium">Logout</span>
                            </button>
                        </a>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar
