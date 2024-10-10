"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import useUploadImage from '../(components)/Hooks/useUploadImage';
import Link from 'next/link';

const SignUpPage = () => {
    const uploadImage = useUploadImage();
    console.log(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async(data) => {
        console.log(data);
        const photo = data.photo[0];
        // console.log(photo);
        const uploadedPhotoData = await uploadImage(photo);
        console.log(uploadedPhotoData?.display_url);

        
    };

    return (
        <section className="">
            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white shadow-md p-6 rounded-xl">

                    <div className="flex flex-col mt-6">
                        <h3 className="mt-3 text-xl font-medium text-center text-gray-600 ">Welcome Back</h3>

                        <p className="mt-1 text-center text-gray-500 ">Sign Up Your account</p>
                    </div>

                    <div className="relative flex items-center mt-8">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>

                        <input
                            type="text"
                            name="name"
                            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Your Name"
                            {...register("name", { required: true })}
                        />
                    </div>
                    {errors.name && <span className="text-red-500">This field is required</span>}

                    <label htmlFor="dropzone-file" className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>

                        <h2 className="mx-3 text-gray-400">Profile Photo</h2>

                        <input
                            id="dropzone-file"
                            name="photo"
                            type="file"
                            className="hidden"
                            {...register("photo", { required: true })}
                        />
                    </label>
                    {errors.photo && <span className="text-red-500">This field is required</span>}

                    <div className="relative flex items-center mt-6">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </span>

                        <input
                            type="email"
                            name="email"
                            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address"
                            {...register("email", { required: true })}
                        />
                    </div>
                    {errors.email && <span className="text-red-500">This field is required</span>}

                    <div className="relative flex items-center mt-4">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>

                        <input
                            type="password"
                            name="password"
                            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password"
                            {...register("password", { required: true })}
                        />
                    </div>
                    {errors.password && <span className="text-red-500">This field is required</span>}

                    <div className="relative flex items-center mt-4">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>

                        <input
                            type="password"
                            name="confirmPassword"
                            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password"
                            {...register("confirmPassword", { required: true })}
                        />
                    </div>
                    {errors.confirmPassword && <span className="text-red-500">This field is required</span>}

                    <div className="mt-6">
                        <input type="submit" value="Sign Up" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" />

                        <div className="mt-6 text-center text-sm">
                            <span>Already have an account?</span>
                            <Link href="/login" className="text-blue-500 font-bold hover:underline ml-2">
                                Login
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default SignUpPage;