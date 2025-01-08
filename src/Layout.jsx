import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from "./components/index"
import {Toaster} from "sonner"
import { login, logout } from "./features/auth/authSlice"
import { getCurrentUser } from "./services/appwrite/authServices"
import { useDispatch } from 'react-redux'

const Layout = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login(userData))
      }
      else {
        dispatch(logout())
      }
    }).catch((error) => (
      console.error("Error during fetching userData session in Layout.js", error)
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