import React from 'react'
import { getFilePreview } from "../services/appwrite/postServices"
import { Link } from 'react-router-dom'
import parse from "html-react-parser";

const PostCard = ({$id, title, featuredImage, content}) => {
  return (
    <div className='bg-gray-800 p-4 rounded-2xl border border-gray-700 hover:scale-95 transition-all duration-200 ease-linear'>
        <Link to={`/post/${$id}`}>
            <div className='relative w-full pt-[56.25%] overflow-hidden rounded-lg'>
                <img src={getFilePreview(featuredImage)} alt={title} className='absolute inset-0 w-full h-full object-cover' loading='lazy' />
            </div>
            <h3 className='mt-3 font-medium text-xl truncate'>{title}</h3>
            <p className='truncate'>{parse(content)}</p>
        </Link>
    </div>
  )
}

export default PostCard