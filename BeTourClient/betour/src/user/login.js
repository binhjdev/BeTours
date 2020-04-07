import React, { Component } from 'react';
import logo from "../logo-white.png";
import { showAlert } from '../utils/alert';
import { Redirect } from 'react-router-dom';

class login extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    authenticate(jwt, next) {
        if (typeof window !== "undefined") {
            localStorage.setItem("jwt", jwt);
            next();
        }
    }

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true })
        const { email, password } = this.state;
        const user = {
            email,
            password
        };

        // request api login
        this.login(user).then(data => {
            if ((data && data.message)) {
                this.setState({ error: data.message, loading: false });
                showAlert('error', data.message);
            } else {
                if (data.status === 'Success') {
                    showAlert('success', 'Logged in successfully!');
                    // authenticate
                    this.authenticate(data.token, () => {
                        this.setState({ redirectToReferer: true })
                    })
                }
            }
        });
    }

    login = user => {
        return fetch('http://localhost:8080/api/v1/users/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                return response.json();
            }).catch(error => console.log(error));
    }

    render() {
        const { email, password, redirectToReferer, loading } = this.state

        if (redirectToReferer) {
            return <Redirect to="" />
        }

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

                    {loading ? <div><h2>Loading....</h2></div> : ""}
                    
                    <main className="main">
                        <div className="login-form">
                            <h2 className="heading-secondary ma-bt-lg">Log in to your account</h2>
                            <form className="form form--login">
                                <div className="form_group">
                                    <label className="form_label">Email address</label>
                                    <input onChange={this.handleChange("email")} className="form_input" placeholder="dangcao@example.com" autoComplete="autocomplete_off_hack_xfr4!k" value={email} />
                                    <label className="form_label">Password</label>
                                    <input onChange={this.handleChange("password")} className="form_input" type="password" placeholder="********" autoComplete="autocomplete_off_hack_xfr4!k" value={password} />
                                </div>
                                <div className="">
                                    <button onClick={this.clickSubmit} className="btn btn--green">Login</button>
                                </div>
                            </form>
                        </div>
                    </main>
                </body>
            </html>
        );
    }
}

export default login;