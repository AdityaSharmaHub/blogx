import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logoutUser } from "../../services/appwrite/authServices"
import { logout } from "../../features/auth/authSlice"
import { toast } from 'sonner';

const Header = () => {

  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutHandler = () => {
    logoutUser().then(() => (
      dispatch(logout()), 
      toast.success("Logout Successful"),
      navigate('/login')
    )).catch((error) => (
      toast.error("Error logging out"),
      console.log(error)
    ))
  }

  const navItems = [
    {
      label: "Home",
      path: "/",
      active: true,
      target: "_self"
    },
    {
      label: "All Posts",
      path: "/all-posts",
      active: authStatus,
      target: "_self"
    },
    {
      label: "Add Post",
      path: "/add-post",
      active: authStatus,
      target: "_self"
    },
    {
      label: "About",
      path: "https://developeraditya.netlify.app",
      active: !authStatus,
      target: "_blank",
    }
  ]

  return (
    <header className="border-b border-slate-800 bg-slate-900 py-4 px-4 md:px-20 flex items-center justify-between">
      <Link to="/" className="font-bold text-2xl text-slate-100">BlogX<span className='text-indigo-500'>.</span></Link>
      <nav className="flex gap-8">
        {navItems.map((navitem) => navitem.active ? (
          <NavLink 
          key={navitem.label}
          to={navitem.path}
          target={navitem.target}
          className={({isActive}) => `${isActive ? "text-indigo-500" : "text-slate-300"} hover:text-indigo-500 transition duration-100 ease-in`}
          >{navitem.label}</NavLink>
        ) : null)}
        
      </nav>
      <div className='flex gap-2'>
        {authStatus && (
          <div className='flex gap-2 items-center'>
            <p className='py-2 px-4 text-sm rounded-lg bg-slate-800 text-slate-300'>{userData?.email}</p>
            <Link to={"/login"} onClick={logoutHandler} className="bg-indigo-600 text-white py-2 px-4 text-sm rounded-lg hover:bg-indigo-700 transition duration-100 ease-in">Logout</Link>
          </div>
        )}
        {!authStatus && (
          <div className='flex gap-2'>
            <Link to="login" className='bg-indigo-600 text-white py-2 px-4 text-sm rounded-lg hover:bg-indigo-700'>Login</Link>
            <Link to="signup" className='bg-indigo-950 text-white py-2 px-4 text-sm rounded-lg hover:bg-indigo-900'>Signup</Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header