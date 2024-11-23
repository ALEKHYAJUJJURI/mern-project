import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'


function Home() {
  const [message, setMessage] = useState('');
  const navigate= useNavigate()

  
  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        token = await refreshToken()
        if(!token){
          console.log("fail")
        }else{
          navigate('/login');
        }
      
        return null;
      }

      try {
        const res = await axios.get('http://localhost:5001/api/protected',{
          headers: { Authorization: `Bearer ${token}` },
          withCredentials:true
        });
        setMessage(res.data.message);
        console.log(res.data.message)
      } catch (error) {

        console.error('Error fetching protected data:', error);
        localStorage.removeItem('accessToken');
        navigate('/login');
      }
    };
    const refreshToken = async ()=>{
      
      try{
        const res = await axios.post('http:localhost:5001/api/refresh-token',{withCredentials:true})
        localStorage.setItem('accessToken',res.data.accessToken);
        fetchProtectedData()
       
      }catch(err){
        console.log(err)
        navigate('login')
      }
    };

    fetchProtectedData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="">
    <nav className='bg-success d-flex justify-content-between p-2'>
      <h2 className='text-light'>Dashboard</h2>
      <button onClick={handleLogout} className='btn btn-danger'>Logout</button>
    </nav>
    <main className='text-light'>
      <p>Welcome to dashboard</p>
      <p>{message}</p>
    </main>
    </div>
  );
}

export default Home;