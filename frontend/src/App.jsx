
import './App.css'
import Footer from './landing/footer'
import HomePage from './landing/home/HomePage'
import SignInPage from './landing/login/SignIn'
import Navbar from './landing/navbar'
import Dashboard from './landing/dashboard/dashboard'
import {BrowserRouter , Routes , Route} from "react-router-dom"
import EditResume from './landing/dashboard/Resume/Edit'
import NotFound from './landing/Notfound'
import GoToTop from './landing/GoToTop'
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
          <Route path='*' element={<NotFound/>}></Route>
         </Routes>
          <GoToTop/>

        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App
