import React, {Component} from 'react';
import Home from '../screens/home/Home';
import Login from '../screens/login/Login';
import {BrowserRouter as Router, Route} from 'react-router-dom';


class Controller extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div className="main-container">
                    <Route exact path='/' render={(props) => <Login {...props} baseUrl={this.baseUrl}/>}/>
                    <Route path='/home' render={(props) => <Home {...props} baseUrl={this.baseUrl}/>}/>
                </div>
            </Router>

        )
    }
}

export default Controller;
