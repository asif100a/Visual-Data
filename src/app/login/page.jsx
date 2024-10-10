"use client"
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
    const [password, setPassword] = React.useState('');

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => console.log(data)

    return (
        <section className="min-h-screen flex justify-center items-center">
            <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md">
                <div className="px-6 py-4">

                    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 ">Welcome Back</h3>

                    <p className="mt-1 text-center text-gray-500 ">Login or create account</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        {/* Email */}
                        <div className="w-full">
                            <label>Email</label>
                            <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Email"
                            className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>

                        {/* Password */}
                        <div className="w-full">
                            <label>Password</label>
                            <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Password"
                            className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                                {...register("password", { required: true })}
                            />
                            {errors.password && <span className="text-red-500">This field is required</span>}
                        </div>

                        <div className="w-full">

                            <input type="submit" value="Login" className="px-6 py-2 w-full text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" />
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-center py-4 text-center bg-gray-50 ">
                    <span className="text-sm text-gray-600">{"Don't"} have an account? </span>

                    <Link href="/signUp" className="mx-2 text-sm font-bold text-blue-500  hover:underline">Register</Link>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;