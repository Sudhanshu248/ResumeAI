import React, { useState } from 'react';

export default function Login(){
    const [userLoginMethod, setUserLoginMethod] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    return(
        <div className="col">
            <h3 style={{fontFamily:"'Poppins', sans-serif"}}>{userLoginMethod ? "Sign In" : "Sign Up"}</h3>
            {userLoginMethod ? <p>Don't Have an Account?</p> : <p>Already Have an Account?</p>}
            
            <div onClick={() => {
                  setUserLoginMethod(!userLoginMethod)
                }} style={{textAlign: "center"}}>
                  <p>{userLoginMethod ? "Sign Up" : "Sign In"}</p>
                </div>
        </div>
    )
}