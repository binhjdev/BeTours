import React, { Component } from 'react';
import logo from "../logo-white.png";
import { showAlert } from '../utils/alert';

class signup extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
            error: ""
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    clickSubmit = event => {
        event.preventDefault();
        const { name, email, password, passwordConfirm } = this.state;
        const user = {
            name,
            email,
            password,
            passwordConfirm
        };

        // request api sign up
        this.signup(user).then(data => {
            if ((data && data.message)) {
                this.setState({ error: data.message });
                showAlert('error', data.message)
            }
            else {
                if (data.status === 'Success') {
                    showAlert('success', "Sign up in successfully!");
                    window.setTimeout(() => {
                        window.location.assign('/');
                    }, 1500);
                }else {
                    showAlert('error', 'Cannot connected server');
                }
            }
        });

    }

    signup = user => {
        return fetch('http://localhost:8080/api/v1/users/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                return response.json();
            })
            .catch(error => console.log(error));
    };

    render() {
        const { name, email, password, passwordConfirm } = this.state
        return (
            <html>
                <body>
                    <header className="header">
                        <nav className="nav nav-tours">
                            <a className="nav_el" href="/home">All tours</a>
                        </nav>
                        <div className="header_logo">
                            <img src={logo} alt="logo" />
                        </div>
                        <nav className="nav nav-user">
                            <a className="nav_el" href="/login">Log in</a>
                            <a className="nav_el nav_el--cta" href="/signup">Sign up</a>
                        </nav>
                    </header>
                    <main className="main">
                        <div className="login-form">
                            <h2 className="heading-secondary ma-bt-lg">Create your account!</h2>
                            <form className="form form--signup">
                                <div className="form_group">
                                    <label className="form_label">Your name</label>
                                    <input onChange={this.handleChange("name")} className="form_input" type="text" value={name} />
                                    <label className="form_label">Email address</label>
                                    <input onChange={this.handleChange("email")} className="form_input" placeholder="dangcao@example.com" autoComplete="off" value={email} />
                                    <label className="form_label">Password</label>
                                    <input onChange={this.handleChange("password")} className="form_input" type="password" placeholder="********" autoComplete="off" value={password} />
                                    <label className="form_label">Confirm password</label>
                                    <input onChange={this.handleChange("passwordConfirm")} className="form_input" type="password" placeholder="********" autoComplete="off" value={passwordConfirm} />
                                </div>
                                <div className="form_group">
                                    <button onClick={this.clickSubmit} className="btn btn--green">Sign up</button>
                                </div>
                            </form>
                        </div>
                    </main>
                </body>
            </html>
        );
    }
}

export default signup;