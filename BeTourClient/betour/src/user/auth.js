class Auth {
    static authenticateUser(token) {
        localStorage.setItem('token', JSON.stringify(token));
    }

    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    static deAuthenticateUser(){
        localStorage.removeItem('token');
    }

    static getToken() {
        return JSON.parse(localStorage.getItem('token'));
    }
    
}

export default Auth;