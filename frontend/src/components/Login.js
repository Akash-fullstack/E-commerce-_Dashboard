import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        (
            navigate('/')
        )
    },[])
    const handlelogin= async ()=>{
        console.log(email,password);
        let result=await fetch('http://localhost:5000/login',{
            method:"post",
            body:JSON.stringify({email,password}),
            headers:{
            'Content-Type':'application/json'
        },
    });
    result = await result.json()
    console.log(result);
    if(result.auth){
     localStorage.setItem("user",JSON.stringify(result.user))
     localStorage.setItem("token",JSON.stringify(result.auth))

     navigate("/")
    }else{
        alert("Please Enter Details Correctly")
    }
}

    return (
        <div className='login'>
        <h1>LOGIN </h1>
            <input className="inputBox" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Name" />

            <input className="inputBox" type="Password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
            <button onClick={handlelogin} className="button" type='button'>SignUp</button>
        </div>
    )
}
