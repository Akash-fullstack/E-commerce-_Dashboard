import React from 'react';
import {Link,useNavigate} from 'react-router-dom'

const Nav =()=>{
    const auth= localStorage.getItem('user');
    const navigate=useNavigate()
    const logout = ()=>{
        localStorage.clear()
        navigate('/Signup')
    }
    return(
        <div>
           { auth ? <ul className='nav-ul'>
                <li><Link to='/'>Products</Link></li>
                <li><Link to='/add'>Add Product</Link></li>
                <li><Link to='/update'>Update product</Link></li>
                
                <li><Link to='/profile'>Profile</Link></li>
                 <li><Link onClick={logout} to='/signup'>Logout ({JSON.parse(auth).name})</Link></li>
            </ul>
            :<ul className='nav-ul nav-right'>
                <li>
                <li><Link to='/SignUp'>SignUp</Link></li>
               <li> <Link to='/Login'>Login</Link></li>
                </li>
            </ul>
           }
        </div>
    )
}
export default Nav;
                
                
               



