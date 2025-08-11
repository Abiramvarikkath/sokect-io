// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import route from '../../router'

// function Listpeople() {
//     const value  = localStorage.getItem("Auth")

//     const [people,setpeople] = useState([])

//     useEffect(()=>{
//         getDetails()
//     },[])

//     const getDetails = async()=>{
//         const {status,data} = await axios.get(`${route()}listuser`,{headers:{"Authorization":`Bearer ${value}`}})
//         if(status == 200){
//             console.log("data::",data);

//             setpeople(data.people)
            
//         }else{
//             alert(data.msg)
//         }
//     }
//   return (
//     <div>
//         {people.map((user,index)=>
//             <div key={index}>
//                 <div>
//                     <h3>{user.username}</h3>
//                     <img src={user.profile} alt="profile" />
//                 </div>
//             </div>
//         )}
     
//     </div>
//   )
// }

// export default Listpeople
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import route from '../router'
import './Listpeople.scss'
import { useNavigate } from 'react-router-dom'


function Listpeople() {
  const value = localStorage.getItem("Auth")
  const [people, setPeople] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    getDetails()
  }, [])

  const getDetails = async () => {
    try {
      const { status, data } = await axios.get(`${route()}listuser`, {
        headers: { Authorization: `Bearer ${value}` },
      })
      if (status === 200) {
        setPeople(data.people)
      } else {
        alert(data.msg)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleUserClick = (id) => {
    //Navigate to chat page passing oyher user id
    navigate(`/chat/${id}`)
  }

  return (
    <div className="chat-list-container">
      {people.map((user) => (
        <div key={user._id} 
        onClick={() => handleUserClick(user._id)}
        className="chat-item">
          <img
            src={user.profile || 'https://via.placeholder.com/100'}
            alt="profile"
            className="profile-img"
          />
          <div className="user-info">
            <h3>{user.username}</h3>
            <p>Last seen recently</p> {/* optional subtitle or status */}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Listpeople
