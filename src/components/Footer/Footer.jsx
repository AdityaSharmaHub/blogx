import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-100 px-16 py-6 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand Section */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-xl md:text-2xl font-bold">Blog<span className='text-indigo-500'>X</span></h1>
            {/* <p className="text-slate-400 text-sm">Your go-to blog for insightful articles.</p> */}
          </div>

          {/* Navigation Links */}
          <div className="mb-4 md:mb-0">
            <ul className="flex space-x-4 text-sm md:text-base">
              <li>
                <a href="https://developeraditya.netlify.app" target="_blank" className="text-slate-400 hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="/" className="text-slate-400 hover:text-white transition">
                  Login
                </a>
              </li>
              <li>
                <a href="/" className="text-slate-400 hover:text-white transition">
                  Signup
                </a>
              </li>
              <li>
                <a href="https://developeraditya.netlify.app" target="_blank" className="text-slate-400 hover:text-white transition">
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
              className="text-slate-400 hover:text-white transition"
            >
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a
              href="https://x.com/sharmaadityax"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition"
            >
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a
              href="https://github.com/AdityaSharmaHub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition"
            >
              <i className="fab fa-github text-xl"></i>
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-slate-400 text-xs md:text-sm mt-10">
          Made with ❤️ by <Link to={"https://developeraditya.netlify.app"} target="_blank" className='text-slate-300 hover:underline font-medium'>Aditya Sharma</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer