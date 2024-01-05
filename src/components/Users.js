import React from "react";
import { useState, useEffect } from "react";  //hookes
import { Link } from "react-router-dom";

//import { useNavigate } from "react-router-dom";

const Users = () => {

    const [product, setproduct] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);
    const getProducts = async () => {

        try {
           // let userId = localStorage.getItem('user');
           // userId = JSON.parse(userId)._id;
            let result = await fetch(`http://localhost:3000/view`,{
              //  headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}` }
            });
            result = await result.json();
            setproduct(result);
            localStorage.setItem("user",JSON.stringify(result));

           
        } catch (error) {
            //alert(error.message);
        }
    }

    const deleteProduct = async (id) => {
        //var pro_id = id;
       
            let result = await fetch(`http://localhost:3000/delete/${id}`, {
                method: 'delete',

               // headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}` }

            });
            //result = await result.json();
            getProducts();
           
    }
   

    
    return (
        <div className="product-list">
            <h2 className="productlist">User list</h2>
            
            <ul >
                <li>s.no</li>
                <li>name</li>
               
                <li>operation</li>
            </ul>
            {
                product.length > 0 ? product.map((item, index) =>

                    <ul key={item.id}>
                        <li>{item.id}</li>
                        <li>{item.name}</li>
                        
                        <li><button onClick={() => deleteProduct(item.id)}>Delete</button>
                            
                        </li>
                    </ul>
                ) : <h3 className="productlist">User not found</h3>
            }
        </div>
    );
}

export default Users;