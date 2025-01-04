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
    const { register, handleSubmit } = useForm()

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
            {error && <p className='text-red-500 text-center'>{error}</p>}
            <form onSubmit={handleSubmit(signup)}>
                <div className="mb-4">
                    <Input label="Name" placeholder="Enter your name" {...register("name", { required: true })} />
                </div>
                <div className="mb-4">
                    <Input label="Email" placeholder="Enter your email" {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}/>
                </div>
                <div className="mb-6">
                    <Input label="Password" placeholder="Enter your password" type="password" {...register("password", { required: true })} />
                </div>
                <Button type='submit' className='w-full'>{loading ? "Signing up..." : "Sign up"}</Button>
            </form>
            <p className='text-center text-sm mt-4 text-slate-400'>Already have an account? <Link to="/login" className='text-indigo-500 hover:underline'>Login</Link></p>
        </div>
    </div>
  )
}

export default Signup