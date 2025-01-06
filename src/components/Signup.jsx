import React, { useState } from 'react'
import { Button, Input } from "./index"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login as authLogin } from "../features/auth/authSlice"
import { createAccount, getCurrentUser } from "../services/appwrite/authServices"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'

const Signup = () => {

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: {errors} } = useForm()

    const signup = async(data) => {
        setLoading(true)
        setError("")
        try {
            const userData = await createAccount(data)
            if (userData) {
                const userData = await getCurrentUser()
                if (userData) {
                    setLoading(false)
                    dispatch(authLogin(userData))
                    toast.success("Account created successfully!")
                    navigate("/")
                } 
            }
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
    }

  return (
    <div>
        <div className='bg-slate-900 px-6 py-8 border border-slate-800 rounded-xl'>
            <h2 className="font-medium text-2xl mb-1 text-center">Get started</h2>
            <p className='text-center text-slate-400 mb-6'>Sign up to create an account</p>
            {error && <p className="text-red-400 text-sm mb-4 text-center bg-red-500/10 px-3 py-1.5 rounded-lg inline-block">{error}</p>}
            <form onSubmit={handleSubmit(signup)}>
                <div className="mb-4">
                    <Input 
                    label="Name" 
                    placeholder="Enter your name" 
                    {...register("name", { 
                        required: "Name is required", 
                        minLength: { value: 3, message: "Name must be at least 3 characters" },
                    })} 
                    />
                    {errors.name && (
                        <p className="text-red-400 text-sm mt-2 bg-red-500/10 px-3 py-1.5 rounded-lg inline-block">{errors.name.message}</p>
                    )}
                </div>
                <div className="mb-4">
                    <Input label="Email" placeholder="Enter your email" {...register("email", {
                        required: "Email is required",
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}/>
                    {errors.email && (
                        <p className="text-red-400 text-sm mt-2 bg-red-500/10 px-3 py-1.5 rounded-lg inline-block">{errors.email.message}</p>
                    )}
                </div>
                <div className="mb-6">
                    <Input 
                    label="Password" 
                    placeholder="Enter your password" 
                    type="password" {...register("password", { 
                        required: "Password is required",
                        minLength: { value: 8, message: "Password must be at least 8 characters" },
                    })} 
                    />
                    {errors.password && (
                        <p className="text-red-400 text-sm mt-2 bg-red-500/10 px-3 py-1.5 rounded-lg inline-block">{errors.password.message}</p>
                    )}
                </div>
                <Button type='submit' className='w-full'>
                    {
                        loading ? <div className="flex items-center justify-center">
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing up...
                    </div> : "Sign up"
                    }
                </Button>
            </form>
            <p className='text-center text-sm mt-4 text-slate-400'>Already have an account? <Link to="/login" className='text-indigo-500 hover:underline'>Login</Link></p>
        </div>
    </div>
  )
}

export default Signup