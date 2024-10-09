"use client"
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

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Email */}
                        <div className="w-full">
                            <label>Email</label>
                            <div className="relative w-[80%]">
                                <input type="email" name="email" id="email" className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                                {...register("email", { required: true })}
                                />
                                <span className=" absolute top-3 left-5 peer-focus:-top-1 peer-focus:bg-inherit peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                                    Your email
                                </span>
                            </div>
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>

                        {/* Password */}
                        <div className="w-full">
                            <label>Email</label>
                            <div className="relative w-[80%]">
                                <input type="password" name="password" id="password" className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                                {...register("password", { required: true })}
                                />
                                <span className=" absolute top-3 left-5 peer-focus:-top-1 peer-focus:bg-inherit peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                                    Your password
                                </span>
                            </div>
                            {errors.password && <span className="text-red-500">This field is required</span>}
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <a href="#" className="text-sm text-gray-600  hover:text-gray-500">Forget Password?</a>

                            <input type="submit" value="Login" className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" />
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-center py-4 text-center bg-gray-50 ">
                    <span className="text-sm text-gray-600">{"Don't"} have an account? </span>

                    <a href="#" className="mx-2 text-sm font-bold text-blue-500  hover:underline">Register</a>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;