import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({children, authentication = true}) => {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
      if(authentication && authStatus !== authentication) {
        navigate('/login');
      }
      else if(!authentication && authStatus !== authentication) {
        navigate("/")
      }
      setLoader(false)
    }, [authStatus, navigate, authentication])
    

  return loader ? <div className='text-center font-medium text-2xl'>Loading...</div> : children;
}

export default AuthLayout