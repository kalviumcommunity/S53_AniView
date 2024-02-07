import Home from './components/Home'
import Listing from './components/Listing'
import Navbar from './components/Navbar'
import {Routes,Route} from "react-router-dom"


export default function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/list' element={<Listing/>}/>
      </Routes>
    </div>
  )
}
