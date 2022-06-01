import React ,{useState,useEffect}from 'react'
import {useNavigate} from 'react-router-dom'



const SignUp=()=>{
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        (
            navigate('/')
        )
    },[])

    const Data= async ()=>{
        console.log(name,email,password);
        let result = await fetch('http://localhost:5000/register',{
            method:'Post',
            body:JSON.stringify({name,email,password}),
headers:{
                'Content-Type':'application/json'
            },
        });
        result = await result.json()
        console.log(result);
        localStorage.setItem("user",JSON.stringify(result.result))
        localStorage.setItem("token",JSON.stringify(result.auth))

        navigate('/')
    }
        
        
            
    return(
        <div className='reg'>
            <h1>Register</h1>
            <input className="inputBox" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"/>
            <input className="inputBox" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Name"/>
            
            <input className="inputBox" type="Password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"/>
            <button onClick={Data} className="button"type='button'>SignUp</button>

        </div>
    )
}
export default SignUp;