import React, {Component} from 'react';
import './Login.css';
import '../../common/common.css';
import Header from '../../common/header/Header';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    upcomingMoviesHeading: {
        textAlign: 'center',
        background: '#ff9999',
        padding: '8px',
        fontSize: '1rem'
    },
    gridListUpcomingMovies: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },
    gridListMain: {

        transform: 'translateZ(0)',
        cursor: 'pointer'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
    },
    title: {
        color: theme.palette.primary.light,
    }
});

class Login extends Component {
    constructor() {
        super();
        this.state = {
            value: 0,
            username: "",
            usernameRequired: "dispNone",
            password: "",
            passwordRequired: "dispNone",
            registrationSuccess: false,
            loggedIn: sessionStorage.getItem('access-token') == null ? false : true,
            invalidLogin: "dispNone"
        };
    }

    inputUsernameChangeHandler = (e) => {
        this.setState({username: e.target.value})
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({password: e.target.value})
    }

    toHome = () => {
        this.props.history.push('/home');
    }
    loginClickHandler = () => {

        this.state.username === "" ? this.setState({usernameRequired: "dispBlock"}) : this.setState({usernameRequired: "dispNone"});
        this.state.password === "" ? this.setState({passwordRequired: "dispBlock"}) : this.setState({passwordRequired: "dispNone"});

        if (this.state.username === "" || this.state.password === "") {
            return
        }

        let username = "user";
        let password = "password";
        let accesstoken = "";


        if (this.state.username == username && this.state.password == password) {
            this.setState({invalidLogin: "dispNone"});
            sessionStorage.setItem('access-token', accesstoken);
            this.toHome();
        } else {
            this.setState({invalidLogin: "dispBlock"})
            sessionStorage.setItem('access-token', null);
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Header/>
                <div className="login-container">
                    <div className="login">
                        <Card className="username">
                            <CardContent>
                                <FormControl>
                                    <span className="title">
                                        LOGIN
                                    </span>
                                </FormControl>
                                <br/>
                                <FormControl required className="username">
                                    <InputLabel htmlFor="username"> Username </InputLabel>
                                    <Input id="username" type="text" username={this.state.username}
                                           onChange={this.inputUsernameChangeHandler}/>
                                    <FormHelperText className={this.state.usernameRequired}><span
                                        className="red">required</span></FormHelperText>
                                </FormControl><br/><br/>
                                <FormControl required className="password">
                                    <InputLabel htmlFor="password"> Password </InputLabel>
                                    <Input id="password" type="password"
                                           onChange={this.inputPasswordChangeHandler}/>
                                    <FormHelperText className={this.state.passwordRequired}>
                                        <span className="red">required</span></FormHelperText>
                                </FormControl><br/>
                                <FormHelperText className={this.state.invalidLogin}>
                                    <span className="red">Incorrect username and/or the password</span></FormHelperText>
                                <br/><br/>
                                <Button variant="contained" color="primary"
                                        onClick={this.loginClickHandler}>LOGIN</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;