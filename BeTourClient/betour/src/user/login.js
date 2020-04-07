import React, { Component } from 'react';
import { showAlert } from '../utils/alert';
import { Redirect } from 'react-router-dom';
import auth from '../user/auth';

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

    authenticate(token, next) {
        if (typeof window !== "undefined") {
            auth.authenticateUser(token);
            next();
            window.location.reload(true);
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
                } else {
                    showAlert('error', 'Cannot connected server');
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
        const { email, password, redirectToReferer } = this.state

        if (redirectToReferer) {
            return <Redirect to=""/>
        }


        return (
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
                        <div className="form_group">
                            <button onClick={this.clickSubmit} className="btn btn--green">Login</button>
                        </div>
                    </form>
                </div>
            </main>
        );
    }
}

export default login;