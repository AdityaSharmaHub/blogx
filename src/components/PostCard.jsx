import React from 'react'
import { getFilePreview } from "../services/appwrite/postServices"
import { Link } from 'react-router-dom'
import parse from "html-react-parser";

const PostCard = ({$id, title, featuredImage, content, username}) => {
  return (
    <div className='bg-gray-800 p-4 rounded-2xl border border-gray-700 hover:scale-95 transition-all duration-200 ease-linear'>
        <Link to={`/post/${$id}`}>
            <div className='relative w-full pt-[56.25%] overflow-hidden rounded-lg'>
                <img src={getFilePreview(featuredImage)} alt={title} className='absolute inset-0 w-full h-full object-cover' loading='lazy' />
            </div>
            <h3 className='mt-3 font-medium text-xl truncate'>{title}</h3>
            <p className='text-slate-200 mt-2 truncate line-clamp-1'>{parse(content)}</p>
            <div className='flex items-center justify-between gap-2 mt-4'>
              <div className='bg-slate-900 flex items-center py-2 px-4 rounded-full'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user text-slate-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <p className='text-slate-400 text-sm'>{username}</p>
              </div>
              <div className='mx-2'>
                <p className='text-indigo-500 hover:text-indigo-400 text-sm'>Read more...</p>
              </div>
            </div>
        </Link>
    </div>
  )
}

export default PostCard