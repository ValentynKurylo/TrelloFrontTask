import React, {useState, useRef} from 'react';
import {useDispatch} from "react-redux";

import "./auth.css"
import UserService from "../../services/userService";


const Registration = () => {
    let dispatch = useDispatch()
    let [user, setUser] = useState({})

    let nameRef = useRef('')
    let emailRef = useRef('')
    let passwordRef = useRef('')

    function Registr() {
        setUser(user.username = nameRef.current.value)
        setUser(user.email = emailRef.current.value)
        setUser(user.password = passwordRef.current.value)
        console.log(user)
        UserService.registration(user).then(value => {
            console.log(value)
            if (value.data.token) {
                dispatch({type: 'SET_TOKEN', payload: value.data.token})
                dispatch({type: 'SET_CURRENT_USER', payload: value.data.user})
                localStorage.setItem('token', value.data.token)
            } else {
                alert("Something wrong")
            }
        })
    }

    return (
        <div >
            <center>
                <div className='registration'>
                    <div className="header1">Registration</div>
                    <input ref={nameRef} type="text" placeholder="Enter fullName..."/>
                    <hr/>
                    <input ref={emailRef} type="text" placeholder="Enter email..."/>
                    <hr/>
                    <input ref={passwordRef} type="password" placeholder="Enter password..."/>
                    <button className="registration_btn" onClick={() => {
                        Registr()
                    }}>Submit
                    </button>
                </div>
            </center>
        </div>
    );
};

export default Registration;