import './form.css';
import Form from './form';

export default function SignInPage(){
    return(
        <>
            <div className="boxs p-4" style={{marginTop: "5vh"}}>
                    <div className="left-img">
                        <img src="/image/Sign.png"  alt="" />
                    </div>

                    <div className="right-box signin ">
                        <Form/>
                    </div>
            </div>
        </>
    )
} 