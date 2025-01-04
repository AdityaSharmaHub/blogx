import React, { useState, useEffect } from 'react';
import { Container, PostForm } from '../components'
import { getPost } from "../services/appwrite/postServices"
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {

    const [post, setPost] = useState([]);
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      if (slug) {
        getPost(slug).then((post) => {
            if (post) {
                setPost(post)
            }
        })
      }
      else {
        navigate('/')
      }
    }, [slug, navigate])
    
  return post && (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  )
}

export default EditPost