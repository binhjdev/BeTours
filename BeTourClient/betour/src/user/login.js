import React, { Component } from 'react';
import logo from "./logo-white.png";

class login extends Component {
    render() {
        return (
            <html>
                <body>
                    <header className="header">
                        <nav className="nav nav-tours">
                            <a className="nav_el" href="/home">All tours</a>
                        </nav>
                        <div className="header_logo">
                            <img src={logo} alt="logo"/>
                        </div>
                        <nav className="nav nav-user">
                            <a className="nav_el" href="/login">Log in</a>
                            <a className="nav_el nav_el--cta" href="/signup">Sign up</a>
                        </nav>
                    </header>
                    <main className="main">
                        <div className="login-form">
                            <h2 className="heading-secondary ma-bt-lg">Log in to your account</h2>
                            <form className="form form--login">
                                <div className="form_group">
                                    <label className="form_label">Email address</label>
                                    <input className="form_input" placeholder="dangcao@example.com" autoComplete="autocomplete_off_hack_xfr4!k"/>
                                    <label className="form_label">Password</label>
                                    <input className="form_input" type="password" placeholder="********" autoComplete="autocomplete_off_hack_xfr4!k"/>
                                </div>
                                <div className="">
                                    <button className="btn btn--green">Login</button>
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