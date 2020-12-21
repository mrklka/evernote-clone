import React, { useState } from 'react'
import axios from 'axios'
import '../styles/login.css'
import { Link } from 'react-router-dom';

function Login() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const onChangeInput = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })

    }



    const loginUser = async e => {
        e.preventDefault()
        const submit = await axios.post('http://localhost:5000/login/auth', {
            email: user.email,
            password: user.password
        }).catch((error) => {
            console.log(error);
        })
        setUser({
            email: '',
            password: ''
        })

        localStorage.setItem('authToken', submit.data.jwtToken)

        window.location = '/';

    }

    return (
        <div className="login-register-container">
            <div className="login-spacer"></div>

            {/* <div className="login_container">
                <form onSubmit={loginUser}>
                    <input type="email" name="email" id="email" placeholder="Email" required value={user.email} onChange={onChangeInput} />
                    <input type="password" name="password" id="password" placeholder="password" required value={user.password} onChange={onChangeInput} />
                    <button type="submit">Login</button>
                    <p><span>Register</span></p>
                    <h2>{error}</h2>
                </form>
            </div> */}
            <div className="card card-container" id="login-card">
                <img alt="evernote" id="profile-img" className="profile-img-card" src="icon.svg" />
                <p id="profile-name" className="profile-brand">Evernote</p>
                <p id="profile-name" className="profile-tag">Remember everything important.</p>

                <form className="form-signin" onSubmit={loginUser}>
                    <input className="form-control" type="email" name="email" id="email" placeholder="Email Address" required value={user.email} onChange={onChangeInput} />
                    <input className="form-control" type="password" name="password" id="password" placeholder="password" required value={user.password} onChange={onChangeInput} />

                    <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Continue</button>
                </form>
                <p id="profile-name" className="profile-tag">Don't have an account? <br /><span><Link to="/register" className="register-redirect-link" >Create One</Link></span>.</p>

            </div>

        </div>
    )
}

export default Login
