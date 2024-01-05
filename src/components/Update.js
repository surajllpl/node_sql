import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Update_user = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  

  const params = useParams();
  const navigate = useNavigate();

  

  
  const handleUpdate = async () => {
    // Add logic here to update the product details
    let result = await fetch(`http://localhost:3000/update/${id}`, {
      method: 'put',
      body: JSON.stringify({ name }),
      headers: {
        'content-type': 'application/json',
     //   authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

      }
    });
    
      navigate('/')

   
  };

  return (
    <div className="register">
      <div className="productlist">
        <h3 className="login-head">Update User</h3>
        <input
          className="inputBox"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="User Id"
        />
        <input
          className="inputBox"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="User Name"
        />
       
        <button className="app-Button" type="button" onClick={handleUpdate}>
          Update Product
        </button>
      </div>
    </div>
  );
};

export default Update_user;
