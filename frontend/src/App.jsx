import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import Signin from './Components/Signin/Signin';
import Home from './Components/Home/home';
import Nav from './Components/Nav/Nav';
import Profile from './Components/Profile/Profile';
import Listpeople from './Components/Listpeople/Listpeople';
import Chat from './Components/Chat/Chat';

function App() {
  return (
    <BrowserRouter>


    <Nav/>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path='/' element={<Home />}/>
        <Route path='/listuser' element={<Listpeople/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/Chat/:otherUserId' element={<Chat/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
