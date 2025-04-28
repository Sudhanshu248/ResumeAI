import './form.css';
import Form from './form';

export default function SignInPage(){
    return(
        <>
            <div className="container p-4" style={{marginTop: "0vh"}}>
                <div className="row p-4">
                    
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