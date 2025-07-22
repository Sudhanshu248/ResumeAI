import './App.css';
import Footer from './landing/footer/footer';
import HomePage from './landing/home/HomePage';
import Navbar from './landing/navbar/navbar';
import Dashboard from './landing/dashboard/component/dashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import EditResume from './landing/dashboard/Resume/Edit'
import NotFound from './landing/notFound/Notfound'
import GoToTop from './landing/goToTop/GoToTop'
import ViewResume from './landing/viewResume/view/viewResume'
import { ResumeProvider } from './context/ResumeContext'
import ConnectionTest from './components/ConnectionTest'
import Signup from './landing/Signup/Signup'
import LogInPage from './landing/login/Loginpage'
import SignUpPage from './landing/Signup/SignupPage';

function App() {
  return (
    <>
      <BrowserRouter>

        <Navbar />
        <ConnectionTest />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/login' element={<LogInPage />} />

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
          <Route
            path='/resume/:id/view'
            element={
              <ResumeProvider>
                <ViewResume />
              </ResumeProvider>
            } />

          <Route path='*' element={<NotFound />} />
        </Routes>

        <GoToTop />
        <Footer />

      </BrowserRouter>
    </>
  )
}

export default App
