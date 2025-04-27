
import './App.css'
import Footer from './landing/footer'
import HomePage from './landing/home/HomePage'
import SignInPage from './landing/login/SignIn'
import Navbar from './landing/navbar'
import Dashboard from './landing/dashboard/dashboard'
import {BrowserRouter , Routes , Route} from "react-router-dom"
import EditResume from './landing/Resume/edit'
function App() {

 

  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/signin' element={<SignInPage />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/dashboard/resume/:id' element={<EditResume/>}></Route>
          {/* <Route path='*' element={<Notfound/>}></Route> */}
        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App
