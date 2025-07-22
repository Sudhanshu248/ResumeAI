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
<BrowserRouter>
        <Navbar />
        <ConnectionTest />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signin' element={<SignInPage />} />
          
          {/* Wrap only these routes with ResumeProvider */}
          <Route
            path='/dashboard'
            element={
              <ResumeProvider>
                <Dashboard />
              </ResumeProvider>
            }
          />
          <Route
            path='/resume/:id/edit'
            element={
              <ResumeProvider>
                <EditResume />
              </ResumeProvider>
            }
          />

          <Route path='/resume/:id/view' element={<ViewResume />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <GoToTop />
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
