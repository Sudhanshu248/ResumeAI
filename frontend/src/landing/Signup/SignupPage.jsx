import './signup.css';
import Signup from "./Signup";


export default function SignUpPage(){
    return(
        <>
            <div className="boxs p-4" style={{marginTop: "5vh"}}>
                    <div className="left-img">
                        <img src="/image/Sign.png"  alt="Sign Up Image" />
                    </div>

                    <div className="right-box signin ">
                        <Signup/>
                    </div>
            </div>
        </>
    )
} 