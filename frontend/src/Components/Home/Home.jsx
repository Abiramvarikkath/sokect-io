import React from 'react';
import './Home.scss';
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate()

  const handlClick = () =>{
    navigate(`/listuser`)
  }
  return (
    <>
      
     <div className='dv1'
     onClick={() => handlClick()}>
        <FaPlus className='Fa' />
     </div>
    </>
  );
}

export default Home;
