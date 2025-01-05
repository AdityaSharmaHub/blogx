import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from "./components/index"
import {Toaster} from "sonner"
import { login } from "./features/auth/authSlice"
import { getCurrentUser } from "./services/appwrite/authServices"
import { useDispatch } from 'react-redux'

const Layout = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        dispatch(login(user))
      }
    }).catch((error) => (
      console.log(error)
    ))
  }, [])
  

  return (
    <div className='min-h-screen flex flex-wrap content-between bg-slate-950 text-slate-100'>
      <div className='w-full block'>
        <Header />
        <main className='flex flex-col items-center justify-center py-12'>
          <Outlet />
        </main>
        <Toaster richColors theme="dark" />
        <Footer />
      </div>
    </div>
  )
}

export default Layout