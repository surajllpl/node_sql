import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {


    return (
        <div>
          
            <ul className="Nav-ul">
                <li><Link to="/">Users</Link></li>
                <li><Link to="/search">Search User</Link></li>
                <li><Link to="/update"> Update User</Link></li>
                <li><Link to="/add">Add User</Link></li>

            </ul>
        </div>
    )
}

export default Nav;