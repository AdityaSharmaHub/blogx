import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from "./components/index"
import {Toaster} from "sonner"

const Layout = () => {
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