import React from 'react'
import { Container } from '..'

const Footer = () => {
  return (
    // <footer className='bg-slate-950 border-t border-slate-900 p-4'>
    //   <div className='text-center'>
    //     <p className='text-slate-300'>&copy; 2024 | All rights reserved</p>
    //   </div>
    // </footer> 
    <footer className="bg-slate-900 text-slate-100 py-6 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand Section */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">BlogX<span className='text-indigo-500'>.</span></h1>
            {/* <p className="text-slate-400 text-sm">Your go-to blog for insightful articles.</p> */}
          </div>

          {/* Navigation Links */}
          <div className="mb-4 md:mb-0">
            <ul className="flex space-x-4">
              <li>
                <a href="/about" className="text-slate-400 hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-slate-400 hover:text-white transition">
                  Login
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-slate-400 hover:text-white transition">
                  Signup
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-slate-400 hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a
              href="https://linkedin.com/in/aditya-r-sharma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white transition"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white transition"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://github.com/AdityaSharmaHub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white transition"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-slate-400 text-sm mt-6">
          &copy; {new Date().getFullYear()} BlogX. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer