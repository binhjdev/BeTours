import React, { Component } from 'react';
import { showAlert } from '../utils/alert';
import { Redirect } from 'react-router-dom';
import auth from '../user/auth';

class signup extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
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
        }
    }

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true })
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
                this.setState({ error: data.message, loading: false });
                showAlert('error', data.message)
            }
            else {
                if (data.status === 'Success') {
                    showAlert('success', "Sign up in successfully. Please logged to account");
                    this.authenticate(data.token, () => {
                        this.setState({ redirectToReferer: true })
                    })
                } else {
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
        const { name, email, password, passwordConfirm, redirectToReferer } = this.state

        if (redirectToReferer) {
            return <Redirect to="/login" />
        }

        return (
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
        );
    }
}

export default signup;