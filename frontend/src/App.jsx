import './App.css'
import Footer from './landing/footer/footer'
import HomePage from './landing/home/HomePage'
import SignInPage from './landing/login/SignIn'
import Navbar from './landing/navbar/navbar'
import Dashboard from './landing/dashboard/component/dashboard'
import {BrowserRouter , Routes , Route} from "react-router-dom"
import EditResume from './landing/dashboard/Resume/Edit'
import NotFound from './landing/notFound/Notfound'
import GoToTop from './landing/goToTop/GoToTop'
import ViewResume from './landing/viewResume/view/viewResume'
import { ResumeProvider } from './context/ResumeContext'
import ConnectionTest from './components/ConnectionTest'

function App() {
  return (
    <>
      <ResumeProvider>
        <BrowserRouter>
          <Navbar />
          <ConnectionTest />
          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/signup' element={<SignInPage />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/resume/:id/edit' element={<EditResume/>}></Route>
            <Route path='/resume/:id/view' element={<ViewResume/>}></Route>
            <Route path='*' element={<NotFound/>}></Route>
          </Routes>
          <GoToTop/>
          <Footer />
        </BrowserRouter>
      </ResumeProvider>
    </>
  )
}

export default App
