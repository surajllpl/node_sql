import React from "react";
import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Searchuser = () => {
    const [id, setId] = useState("");
    const [product, setproduct] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    // console.warn(id);

    const addProduct = async () => {
        //console.war(name);
        if (!id) {
            setError(true);

        }
        try {
            //let userId = localStorage.getItem('user');
            // userId = JSON.parse(userId)._id;
    console.warn(id);

            let result = await axios.get(`http://localhost:3000/viewone/${id}`, {
                method: 'get',
                
                 headers: {
                    'content-type': 'application/json',
                    //authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

                }
            });
            console.warn(result);
           // result = await result.json();
           setproduct(result.data)

            if (result.ok) {
               // const data = await result.json();
               // console.warn(data);
                // Process the retrieved data as needed
                alert("Record is added successfully!");
                navigate('/');
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
           // alert(error.message);
        }
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
                <h3 className="login-head">Search User By ID</h3>
                <input className="inputBox"
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    onKeyPress={handlekeypress}
                    placeholder="User ID" />
                {error && !id && <span className="invalid-input">Enter valid ID</span>}


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
export default Searchuser;