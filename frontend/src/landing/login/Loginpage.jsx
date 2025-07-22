import './login.css'
import Login from './login';


export default function LogInPage(){
    return(
        <>
            <div className="boxs p-4" style={{marginTop: "5vh"}}>
                    <div className="left-img">
                        <img src="/image/Sign.png"  alt="" />
                    </div>

                    <div className="right-box signin ">
                        <Login/>
                    </div>
            </div>
        </>
    )
} 