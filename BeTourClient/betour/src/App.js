import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './route/MainRouter';
import Header from './components/header';
import Body from './components/body';
import Wrapper from './components/wrapper';
import Footer from './components/footer';

class App extends Component {
    render() {
        return (
            <div>
                <Wrapper />
                {this.props.children}
                <div>
                    <Body />
                    {this.props.children}
                    <div>
                        <Header />
                        {this.props.children}
                        <BrowserRouter>
                            <MainRouter />
                        </BrowserRouter>
                    </div>
                    <div>
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;