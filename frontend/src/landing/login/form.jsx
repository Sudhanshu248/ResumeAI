import './index.css';
import Button from '@mui/material/Button';
export default function Form(){
    return(
        <>

{/* <div className='form-logo text-center'>
  <img src="/image/logoipsum-custom-logo.svg" alt="" style={{width:"7rem", height:"7rem"  }}/>
</div> */}
<div className="box-form  pe-4 ps-4 pt-5 pb-5" style={{height:"fit-content"}}>
<form action="">

<div className='box-form-h3 d-flex justify-content-evenly mb-3 border border-top-0 border-start-0 border-end-0 border-dark'>
<h3 style={{fontFamily:"'Poppins', sans-serif"}} className=''>Sign Up </h3>
<div className='border border-1 border-dark'></div>
<h3 style={{fontFamily:"'Poppins', sans-serif"}}>Sign In </h3>
</div>

 <div className="input-box h-100 ">

   {/* <label htmlFor="username"></label> */}
   <input type="name" id="username" placeholder="Enter your username" className='mb-5 mt-3' />
   {/* <label htmlFor="email"></label> */}
   <input type="email" id="email" placeholder="Enter your email" className='mb-5 mt-3' />
   {/* <label htmlFor="password"></label> */}
   <input type="password" id="password" placeholder="Enter your password" className='mb-5 mt-3' />

</div>

<div className="login-btn mt-2 mb-3">
   <Button variant="contained" color="primary" >Login</Button>
  </div>
<div className='text-center'> 
<div className='d-flex justify-content-evenly align-items-center'>
<a href="">Forgot Password?</a>
<a href="">Don't have an account?</a>
</div>
<div className='mt-2 mb-0'>
<a href="">Sign Up</a>
</div>
</div>

</form>
</div>
        </>
    )
}   
