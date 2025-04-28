
import './App.css'
import Footer from './landing/footer'
import HomePage from './landing/home/HomePage'
import SignInPage from './landing/login/SignIn'
import Navbar from './landing/navbar'
import Dashboard from './landing/dashboard/component/dashboard'
import {BrowserRouter , Routes , Route} from "react-router-dom"
import EditResume from './landing/dashboard/Resume/Edit.jsx'
function App() {

 

  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/signin' element={<SignInPage />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>

          <Route path='/resume/:id/edit' element={<EditResume/>}></Route>
         </Routes>


        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App
