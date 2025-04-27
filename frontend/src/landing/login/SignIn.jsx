
import './index.css';
import Form from './form';
import Login from './page';

export default function SignInPage(){
    return(
        <>
<div className="container ">
    <div className="row">
        <div className="col">
       <img src="/image/Sign.png" style={{width:"100%"}} alt="" />
        </div>
        <div className="col signin-col-2">
            <Form/>
           
        </div>
    </div>
</div>
         
        </>
    )
} 