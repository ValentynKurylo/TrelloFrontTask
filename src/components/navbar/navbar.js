import React from 'react';
import {Link} from "react-router-dom"


import "./navbar.css"
import {useDispatch, useSelector} from "react-redux";

const Navbar = () => {
    const UserReducer = useSelector((state => state.UserReducer))
    const dispatch = useDispatch()
    function Logout(e) {
        e.preventDefault()
        if(window.confirm("Are you sure?")){
            dispatch({type: "LOGOUT"})
            localStorage.removeItem('token')
        }
    }
    return (
        <div className={"main"}>
            <div className="container">
                <div className={"left"}>
                    <div className="header">KURYLO TRELLO</div>
                </div>

                <div className={"right"}>
                    {!UserReducer.isAuth && <div className="login"><Link to="/login">Login</Link></div>}
                    {!UserReducer.isAuth && <div className="registration_link"><Link to="/registration">Registration</Link></div>}
                    {UserReducer.isAuth && <div className="login" onClick={(e)=>{Logout(e)}}><Link to="/">Logout</Link></div>}
                </div>
            </div>
        </div>
    );
};
export default Navbar;