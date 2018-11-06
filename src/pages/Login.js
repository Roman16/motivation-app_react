import React, {Component} from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock  from '@material-ui/icons/Lock';

import { LoginUser } from '../actions/user'

import '../style/login.scss';

class Login extends Component {
    state = {
        username: 'admin',
        password: 'Motivated_Admin0'
    };

    login = () => {
        LoginUser(this.state)
            .then(res => {
                localStorage.setItem('TOKEN', res);
                this.props.history.push('/categories');
            });
    };

    render() {
        return (
            <div className="page login-page">
                    <div className="login-form">
                        <TextField
                            label="Login"
                            defaultValue={this.state.username}
                            onChange={event => this.setState({username: event.target.value})}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            defaultValue={this.state.username}
                            onChange={event => this.setState({password: event.target.value})}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            variant="contained"
                            component="span"
                            onClick={this.login}
                        >
                            Sign in
                        </Button>
                    </div>
            </div>
        );
    }
}

export default Login;