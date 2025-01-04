import React, { useState } from 'react'
import { Button, Input } from "./index"
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { loginUser, getCurrentUser } from "../services/appwrite/authServices"
import { useDispatch } from 'react-redux'
import { login as authLogin } from "../features/auth/authSlice"
import { toast } from "sonner"

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, setValue } = useForm()

    const login = async(data) => {
        setError("")
        setIsLoading(true)
        try {
            const session = await loginUser(data)
            if(session) {
                const userData = await getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData)) 
                    toast.success("Logged in successfully!")
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false)
    }

    const loginWithTestUser = async() => {
        setValue("email", "test@test.com")
        setValue("password", "123456789")
        try {
            const session = await loginUser(email, password)
            if (session) {
                const userData = await getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData))
                    toast.success("Logged in successfully!")
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='w-full'>
        <div className='bg-slate-900 px-6 py-8 border border-slate-800 rounded-xl'>
            <h2 className="font-medium text-2xl mb-1 text-center">Welcome back</h2>
            <p className='text-center text-slate-400 mb-6'>Login to access your account</p>
            {error && <p className="text-red-600 my-4 text-center">{error}</p>}
            <form onSubmit={handleSubmit(login)}>
                <div className="mb-4">
                    <Input label="Email" type="email" placeholder="Enter your email" {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })} />  
                </div>
                <div className="mb-6">
                    <Input label="Password" type="password" placeholder="Enter your password" {...register("password", {
                    required: true,
                })} />
                </div>
                <Button type='submit' className='w-full'>
                    {isLoading ? "Logging in..." : "Login"}
                </Button>
                <Button className='w-full bg-slate-800 text-gray-400 mt-4 hover:bg-slate-700 hover:text-slate-100' onClick={loginWithTestUser}>
                    Login with Test Account
                </Button>
            </form>
            <p className='text-center text-sm mt-4 text-slate-400'>Don't have an account? <Link to="/signup" className='text-indigo-500 hover:underline'>Sign up</Link></p>
        </div>
    </div>
  )
}

export default Login