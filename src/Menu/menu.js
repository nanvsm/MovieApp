import React, { Component } from 'react'
import './menu.css'
import { withRouter } from 'react-router-dom'

/* Menu page */
class Menu extends Component {

  /* Navigate to login page */
  logout = () => {
    this.props.history.push({
      pathname: "/",
    })
  }

  render() {

    return (
      <nav className="navbar navbar-default navmenu">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-2">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/dashboard">OMDB Movies</a>
          </div>
          <div className="collapse navbar-collapse" id="navbar-collapse-2">
            <ul className="nav navbar-nav navbar-left">
              <li><a href="/dashboard"><i class="fa fa-floppy-o t-pad" aria-hidden="true"></i>Dashboard </a></li>
              <li><a href="/explore"><i class="fa fa-list t-pad" aria-hidden="true"></i>Explore</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <button type="submit" className="btn btn-default top" onClick={() => this.logout()}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Menu)