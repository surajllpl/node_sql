import React from "react";
import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Add_user = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");

    const [product, setproduct] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    // console.warn(id);

    const addProduct = async () => {
        //console.war(name);
      
       

            let result = await fetch(`http://localhost:3000/newupdate`, {
                method: 'post',
                body: JSON.stringify({ name }),
                headers: {
                  'content-type': 'application/json',
               //   authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          
                }
              });

            console.warn(result);
        
           setproduct(result.data)

          
    }
    const handlekeypress = (event) => {
        if (event.key === 'Enter') {
            console.log('Enter key pressed');
            addProduct();
        }
    };
    return (
        <div>
            <div className="register">
                <h3 className="login-head">Add User</h3>
                <input className="inputBox"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={handlekeypress}
                    placeholder="User" />
                {error && !id && <span className="invalid-input">Enter user</span>}


                <button className="app-Button"
                    type="button"
                    onClick={addProduct}
                >Search</button>
              
                {product &&(<div>
                        <p>ID : { product.id}</p>
                        <p>Name : { product.name}</p>

                </div>)}

                   
                   
            </div>
        </div>
    )
}
export default Add_user;