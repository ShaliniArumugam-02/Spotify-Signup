import{ BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import {ToastContainer} from 'react-toastify'
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
       <ToastContainer/>
      </BrowserRouter>
     
    </>
  )
}

export default App
