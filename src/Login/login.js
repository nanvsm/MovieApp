import React, { Component } from 'react'
import './login.css'
import { withRouter } from 'react-router-dom'

/* Login page */
class Login extends Component {

    constructor() {
        super();
        this.state = {
            error: false,
            errorregister: false,
            errorpsw: false
        };
    }

    /* Handle login validation */
    handlelogin = (email, psw) => {
        if (email.value === '' || psw.value === '') {
            this.setState({
                error: true,
                errorregister: false,
                errorpsw: false
            })
        } else if ((email.value === localStorage.getItem('emailid')) && (psw.value === localStorage.getItem('password'))) {
            this.setState({
                error: false,
                errorregister: false,
                errorpsw: false
            })
            this.props.history.push({
                pathname: "/dashboard"
            })
        } else {
            if (email.value !== localStorage.getItem('emailid')) {
                this.setState({
                    error: false,
                    errorregister: true,
                    errorpsw: false
                })

            } else if (psw.value !== localStorage.getItem('password')) {
                this.setState({
                    error: false,
                    errorregister: false,
                    errorpsw: true
                })
            }
        }
    }

    /* Navigate to register page */
    handleregister = () => {
        this.props.history.push({
            pathname: '/register',
        })
    }

    render() {

        return (
            <div className="col-md-4 col-sm-8 col-xs-10 login_form_grid">
                <h1 className="title">OMDB Movies Login!</h1>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" ref={email => this.emailid = email} placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" ref={psw => this.psw = psw} id="exampleInputPassword1" placeholder="Password" />
                </div>

                {this.state.error ? <small className="form-text text-muted">Fields cannot be empty</small> : ''}
                {this.state.errorpsw ? <small className="form-text text-muted">Password is incorrect. Please try with correct password</small> : ''}
                {this.state.errorregister ? <small className="form-text text-muted">Emailid is not register. Please register and try again.</small> : ''}

                <div>
                    <span className="text-left">
                        <button className="btn btn-primary" onClick={() => this.handlelogin(this.emailid, this.psw)}>Submit</button>
                    </span>
                    <span className="text-right">
                        <button className="btn btn-primary" onClick={() => this.handleregister()}>Register</button>
                    </span>
                </div>
            </div>
        )
    }
}

export default withRouter(Login)