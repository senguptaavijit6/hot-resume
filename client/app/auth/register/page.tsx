'use client'
import React from 'react'
import { Poppins } from 'next/font/google'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import Link from 'next/link'

const poppins = Poppins({
    weight: ['200', '400', '700']
})

type formFieldTypes = {
    fName: string,
    lName: string,
    email: string,
    password: string,
    confirmPassword: string
}

const RegisterPage = () => {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<formFieldTypes>()

    const onSubmit = handleSubmit((data) => console.log(data))
    return (
        <>
            <div className="p-12 relative flex flex-col justify-center min-h-dvh bg-sky-500/30">
                <div className="w-full flex flex-row-reverse relative before:content-[''] before:absolute before:z-1 before:h-40 before:w-40 before:-top-[70px] before:left-[70px] before:rounded-full before:bg-white ">
                    <div className='w-full bg-white p-12 rounded-tl-4xl rounded-tr-4xl md:rounded-br-none md:rounded-tl-none flex flex-col items-center z-2'>
                        <p className={`text-2xl ${poppins.className}`}>Welcome at Hot Resume</p>
                        <h1 className={`text-4xl font-black ${poppins.className}`}>Register</h1>

                        <form onSubmit={onSubmit} className='my-8'>
                            <label htmlFor="firstNameInput" className='block ms-2 text-lg'>Enter your First Name <span className='text-red-600 text-2xl'>*</span></label>
                            <input type="text" id='firstNameInput' {...register("fName", { required: true })} className='block bg-sky-500/30 text-lg p-4 rounded-2xl mb-4' />
                            
                            <label htmlFor="lastNameInput" className='block ms-2 text-lg'>Enter your Last Name <span className='text-red-600 text-2xl'>*</span></label>
                            <input type="text" id='lastNameInput' {...register("lName", { required: true })} className='block bg-sky-500/30 text-lg p-4 rounded-2xl mb-4' />
                            
                            <label htmlFor="emailInput" className='block ms-2 text-lg'>Enter your Email <span className='text-red-600 text-2xl'>*</span></label>
                            <input type="email" id='emailInput' {...register("email", { required: true })} className='block bg-sky-500/30 text-lg p-4 rounded-2xl mb-4' />

                            <label htmlFor="passwordInput" className='block ms-2 text-lg'>Enter your Password <span className='text-red-600 text-2xl'>*</span></label>
                            <input type="password" id='passwordInput' {...register("password", { required: true })} className='block bg-sky-500/30 text-lg p-4 rounded-2xl mb-4' />
                            
                            <label htmlFor="confirmPasswordInput" className='block ms-2 text-lg'>Re-enter your Password <span className='text-red-600 text-2xl'>*</span></label>
                            <input type="password" id='confirmPasswordInput' {...register("confirmPassword", { required: true })} className='block bg-sky-500/30 text-lg p-4 rounded-2xl mb-4' />

                            <button type='submit' className='block mx-auto mt-8 py-4 px-10 font-bold text-lg text-white rounded-2xl bg-linear-45 from-sky-500/30 to-sky-500'>Create Account</button>
                        </form>

                        <div>
                            <div className='flex items-center gap-2'>
                                <span className='border-b w-16'></span>
                                Other Options
                                <span className='border-b w-16'></span>
                            </div>
                            <div className="flex justify-between items-center max-w-full mt-5">
                                <button className='p-3 bg-sky-500/30 rounded-full'><Image alt='Google Logo' src={'/images/logo/google_logo.png'} width={30} height={30} /></button>
                                <button className='p-3 bg-sky-500/30 rounded-full'><Image alt='Google Logo' src={'/images/logo/facebook_f_logo.png'} width={30} height={30} /></button>
                                <button className='p-3 bg-sky-500/30 rounded-full'><Image alt='Google Logo' src={'/images/logo/x_logo.png'} width={30} height={30} /></button>
                                <button className='p-3 bg-sky-500/30 rounded-full'><Image alt='Google Logo' src={'/images/logo/github_logo.png'} width={30} height={30} /></button>
                            </div>
                        </div>
                    </div>
                    <div className='w-full hidden md:flex justify-center items-center relative px-32 py-18 bg-[url(/images/register_side_back.png)] bg-cover bg-no-repeat rounded-tl-4xl z-1'>
                        <div className='bg-gray-100/50 backdrop-blur-md h-full w-full rounded-2xl relative hidden lg:flex'>
                            <Image className='absolute bottom-0' alt='Login Page' src={'/images/register_side_img.png'} width={1000} height={1000}/>
                        </div>
                    </div>
                </div>
                <div className="flex relative after:absolute after:content-[''] after:h-40 after:w-40 after:-right-10 after:top-5 after:rounded-full after:bg-sky-700 after:z-1">
                    <div className='bg-gray-800 p-12 w-[100%] rounded-bl-4xl rounded-br-4xl text-white z-2 text-center'>Dont have an account? <Link href={'/auth/login'} className='text-sky-500 ms-2'>Login Now</Link></div>
                </div>
            </div>
        </>
    )
}

export default RegisterPage