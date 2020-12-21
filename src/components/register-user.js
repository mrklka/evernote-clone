import React, { useState } from 'react'
import axios from 'axios'
import '../styles/login.css'
import { Link } from 'react-router-dom';

function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const onChangeInput = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })

    }

    const registerNewUser = async e => {
        e.preventDefault()

        await axios.post('http://localhost:5000/login/new', {
            name: user.name,
            email: user.email,
            password: user.password
        }).catch((error) => {
            console.log(error);
        })
        setUser({
            name: '',
            email: '',
            password: ''
        })

        const token = localStorage.getItem('authToken')

        axios.post('http://localhost:5000/notebooks/add', {
            notebook: "Default"
        }, {
            headers: { Authorization: token }
        })
            .then(res => console.log(res.data));

            window.location = '/';



    }


    return (
        
        <div className="login-register-container">
            <div className="login-spacer"></div>
            <div className="card card-container" id="login-card">
                <img alt="evernote" id="profile-img" className="profile-img-card" src="icon.svg" />
                <p id="profile-name" className="profile-brand">Evernote</p>
                <p id="profile-name" className="profile-tag">Remember everything important.</p>

                <form className="form-signin" onSubmit={registerNewUser} autocomplete="off">
                    <input autocomplete="off" className="form-control" type="text" name="name" id="name" placeholder="name" required value={user.name} onChange={onChangeInput} />
                    <input autocomplete="off"  className="form-control" type="email" name="email" id="email" placeholder="Email" required value={user.email} onChange={onChangeInput} />
                    <input autocomplete="off" className="form-control" type="password" name="password" id="password" placeholder="password" required value={user.password} onChange={onChangeInput} />

                    <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Continue</button>
                </form>
                <p id="profile-name" className="profile-tag">Already have an account? <br /><span><Link className="register-redirect-link" to="/login" >Login</Link></span>.</p>
                
            </div>

            {/* <div className="register_container">
                <form onSubmit={registerNewUser}>
                    <input className="form-control" type="text" name="name" id="name" placeholder="name" required value={user.name} onChange={onChangeInput} />
                    <input className="form-control" type="email" name="email" id="email" placeholder="Email" required value={user.email} onChange={onChangeInput} />
                    <input className="form-control" type="password" name="password" id="password" placeholder="password" required value={user.password} onChange={onChangeInput} />
                    <button type="submit">Login</button>
                    <h2>{error}</h2>
                </form>
            </div> */}

        </div>
    )
}

export default Register
