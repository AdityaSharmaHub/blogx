import { getFileView } from "../services/appwrite/postServices"
import { Link } from 'react-router-dom'
import parse from "html-react-parser";

const PostCard = ({title, slug, featuredImage, content, username}) => {
  return (
    <div className='bg-gray-800 p-4 rounded-2xl border border-gray-700 hover:scale-95 transition-all duration-200 ease-linear shadow-xl shadow-slate-900 hover:shadow-xl'>
      <Link to={`/post/${slug}`}>
        <div className='relative w-full pt-[56.25%] overflow-hidden rounded-lg group'>
          <img
            src={getFileView(featuredImage)}
            alt={title}
            className='absolute inset-0 w-full h-full object-cover'
            loading='lazy'
          />
        </div>
        <h3 className='mt-3 font-medium text-xl truncate transition-colors duration-300 group-hover:text-indigo-400'>
          {title}
        </h3>
        <div className='text-slate-200 mt-2 truncate line-clamp-1'>{parse(content)}</div>
        <div className='flex items-center justify-between gap-2 mt-4'>
          <div className='bg-slate-900 flex items-center gap-2 py-2 px-4 rounded-full border border-slate-700'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-user text-slate-400"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <p className='text-slate-400 text-sm truncate max-w-16'>{username}</p>
          </div>
          <div className='mx-2'>
            <p className='text-indigo-500 hover:text-indigo-400'>Read more</p>
          </div>
        </div>
      </Link>
    </div>

  )
}

export default PostCard