import React, {useState, useRef, useEffect} from 'react';
import {useDispatch} from "react-redux";

import "./auth.css"
import UserService from "../../services/userService";


const Login = () => {
    const dispatch = useDispatch()
    let [user, setUser] = useState({})

    let emailRef = useRef('')
    let passwordRef = useRef('')

    function LoginFunc(e) {
        e.preventDefault()
        console.log("login")
        setUser(user.email = emailRef.current.value)
        setUser(user.password = passwordRef.current.value)
        try {
            UserService.login(user).then(value => {
                console.log(value)
                if(value.data.token) {
                    dispatch({type: 'SET_TOKEN', payload: value.data.token})
                    dispatch({type: 'SET_CURRENT_USER', payload: value.data.user})
                    localStorage.setItem('token', value.data.token)
                }
                else {
                    alert("Wrong Email or Password")
                }
            })
        } catch (e) {
            console.log("error")
        }
    }

    return (
        <div>
            <center>
                <div className='registration'>
                    <div className="header1">Login</div>
                    <input ref={emailRef} type="text" placeholder="Enter email..."/>
                    <hr/>
                    <input ref={passwordRef} type="password" placeholder="Enter password..."/>
                    <button className="registration_btn" onClick={(e) => {
                        LoginFunc(e)
                    }}>Enter
                    </button>
                </div>
            </center>
        </div>
    );
};

export default Login;