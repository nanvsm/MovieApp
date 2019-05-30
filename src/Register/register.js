import React, { Component } from 'react'
import './register.css'
import { withRouter } from 'react-router-dom'

/* Register page */
class Register extends Component {

  constructor() {
    super();
    this.state = {
      error: false,
    };
  }

  /* Handle register validation */
  handleregister = (name, email, psw, addr, no) => {
    if ((name.value !== '') && (email.value !== '') && (psw.value !== '')) {
      localStorage.setItem("emailid", email.value)
      localStorage.setItem("password", psw.value)
      localStorage.setItem("name", name.value)
      this.setState({
        error: false,
      })
      this.props.history.push({
        pathname: '/'
      })
    } else {
      this.setState({
        error: true,
      })
    }
  }

  /* Navigate to login page */
  handlelogin = () => {
    this.props.history.push({
      pathname: '/'
    })
  }

  render() {

    return (

      <div className="col-md-4 col-sm-8 col-xs-10 register_form_grid">
        <h1 className="title">OMDB Movies Register!</h1>
        <div className="form-group">
          <label for="exampleInputEmail1">Name *</label>
          <input type="email" className="form-control" ref={name => this.name = name} placeholder="Enter Name" />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address *</label>
          <input type="email" className="form-control" ref={email => this.emailid = email} placeholder="Enter Email Address" />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password *</label>
          <input type="password" className="form-control" ref={psw => this.psw = psw} placeholder="Enter Password" />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Address</label>
          <input type="email" className="form-control" ref={addr => this.addr = addr} placeholder="Enter Address" />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Contact number</label>
          <input type="email" className="form-control" ref={no => this.no = no} placeholder="Enter contact number" />
        </div>

        {this.state.error ? <small className="form-text text-muted">Fields cannot be empty</small> : ''}

        <div>
          <span className="text-left"> <button className="btn btn-primary"
            onClick={() => this.handleregister(this.name, this.emailid, this.psw, this.addr, this.no)}>Register</button>
          </span>
          <span className="text-right">
            <button className="btn btn-primary" onClick={() => this.handlelogin()}>Login</button>
          </span>
        </div>
      </div>
    )
  }
}

export default withRouter(Register)