import React, { Component } from 'react';
import logo from "../logo-white.png";
import avatar from "../default.jpg"
import { showAlert } from '../utils/alert';
import auth from '../user/auth';

class header extends Component {
    clickSubmit = event => {
        showAlert('success', " Logged out in successfully!");
        window.location.reload(true);
        // removed token in local storage
        auth.deAuthenticateUser();
    }

    render() {
        return (
            <header className="header">
                <nav className="nav nav-tours">
                    <a className="nav_el" href="/">Tours</a>
                </nav>
                <div className="header_logo">
                    <img src={logo} alt="logo" />
                </div>
                {auth.isUserAuthenticated() ? (
                    <nav className="nav nav-user">
                        <a onClick={this.clickSubmit} className="nav_el">Đăng xuất</a>
                        <a className="nav_el" href="/me">
                            <img className="nav_user-img" src={avatar} alt="avatar" />
                            <span>{auth.getToken().user.name}</span>
                        </a>
                    </nav>
                ) : (<nav className="nav nav-user">
                    <a className="nav_el" href="/login">Đăng nhập</a>
                    <a className="nav_el nav_el--cta" href="/signup">Đăng ký</a>
                </nav>)
                }
            </header>
        );
    }
}

export default header;