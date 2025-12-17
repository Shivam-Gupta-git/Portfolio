import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Works from './components/Works'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Admin from './pages/Admin'



function App() {


  return (
    <>
    <div>
     <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Work' element={<Works/>}></Route>
        <Route path='/About' element={<About/>}></Route>
        <Route path='/Contact' element={<Contact/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
      </Routes>
     <Footer></Footer>
    </div>
    </>
  )
}

export default App
