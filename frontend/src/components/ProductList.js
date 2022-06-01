import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ProductList = () => {
    const [products, setProducts] = useState([]);



    useEffect(() => {
        getProducts();
    }, []);

    const deleteProduct = async (id) => {
        // console.log(id)

        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        console.log(result)
        result = await result.json()
        if (result) {
            alert("record is deleted")
            getProducts(result);
        }
    };
    

    const getProducts = async () => {
        let result = await fetch(`http://localhost:5000/products`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result)

    }

    const searchHandle= async(event)=>{
        console.log(event.target.value);
        let key = event.target.value;
        if(key){
        let result = await fetch(`http://localhost:5000/search/${key}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json();
        if(result){
            setProducts(result)
        }
        }else{
            getProducts()
        }
    }

    
  
    // console.log(products);
    return (
        <div className='list'>
            <h3> Product List </h3>
            <input className='search' type="text" placeholder='search Product'
                onChange={searchHandle}
            />
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>price</li>
                <li>Category</li>
                <li>operation</li>

            </ul>
            {
                products.length>0? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>

                            <Link to={"/update/"+item._id}>update</Link>
                        </li>
                    </ul>
                )
                :<h1>No Result Found</h1>
            }
        </div>
    )
        }

export default ProductList;







