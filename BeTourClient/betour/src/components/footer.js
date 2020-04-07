import React, { Component } from 'react';
import logo from "../logo-white.png";

class footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer_logo">
                    <img src={logo} alt="logo" />
                </div>
                <p className="footer_copyright">© 2020 by Dang Cao.</p>
            </footer>
        );
    }
}

export default footer;