import { useEffect } from "react";
import {useParams} from "react-router-dom"
export default function EditResume(){

    const params = useParams();

    useEffect(()=>{
        console.log(params);
    })
    return(
        <>
        <h1>Edit Resume</h1>
        </>
    )
}
