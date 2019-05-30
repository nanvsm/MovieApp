import React, { Component } from 'react'
import './dashboard.css'
import Menu from '../Menu/menu'
import _ from 'lodash';

 /* To display the list of movies rated by current user */
class Dashboard extends Component {

 /* Navigate to movie detail page */
  handlenavigate = (id) => {
    this.props.history.push({
      pathname: `/movies/${id}`
    })
  }

  render() {
    const data = localStorage.getItem("movielist")
    const movieratedata = JSON.parse(data)
   
    const nodata = <div className="row grid-dashboard"><div className="norate">No rated movies available!</div></div>
    
    const movielist = movieratedata ? <div className="row"> {_.map(movieratedata, item => (
      <div className="col-md-3 col-xs-6">
        <div className="card">
          <img className="card-img-top" src={item.poster} alt={item.title} />
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text"><i className="fa fa-calendar t-pad" aria-hidden="true"></i>{item.year}</p>
            <p className="card-text"><i className="fa fa-video-camera t-pad" aria-hidden="true"></i>{item.type}</p>
            <p className="card-text"><i className="fa fa-star-half-o t-pad" aria-hidden="true"></i>{item.imdbrating}</p>
            <p className="card-text"><span>Your rating : </span><i className="fa fa-star-half-o t-pad" aria-hidden="true"></i>{item.rate}</p>
            <a className="btn btn-primary" onClick={() => this.handlenavigate(item.id)}>View</a>
          </div>
        </div>
      </div>
    ))} </div> : nodata;

    return (
      <div>
        <Menu />
        <div className="container-fluid">
          <div className="container">
            {movielist}
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard