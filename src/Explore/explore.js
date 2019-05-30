import React, { Component } from 'react'
import './explore.css'
import Menu from '../Menu/menu'
import axios from 'axios';
import _ from 'lodash';

/* To display the list of movies based on search query */
class Explore extends Component {

  constructor() {
    super();
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios.get(`http://www.omdbapi.com/?apikey=a07c89dc&s=one`)
      .then(res => {
        const movies = res.data.Search;
        this.setState({ movies });
      })
  }

  /* Search items to render */
  handlesearch = () => {
    let search = _.lowerCase(this.searchNode.value)
    axios.get(`http://www.omdbapi.com/?apikey=a07c89dc&s=${search}`)
      .then(res => {
        const movies = res.data.Search;
        this.setState({ movies });
      })
  }

  /* Navigate to movie detail page */
  handlenavigate = (id) => {
    this.props.history.push({
      pathname: `/movies/${id}`
    })
  }

  render() {

    const movielist = this.state.movies ? _.map(this.state.movies, item => (
      <div className="col-md-3 col-xs-6">
        <div className="card">
          <img className="card-img-top" src={item.Poster} alt={item.Title} />
          <div className="card-body">
            <h5 className="card-title">{item.Title}</h5>
            <p className="card-text">{item.Year}</p>
            <a className="btn btn-primary" onClick={() => this.handlenavigate(item.imdbID)}>View</a>
          </div>
        </div>
      </div>
    )) : 'Please search with relevant Movie title';

    return (

      <div>
        <Menu />
        <div className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-md-12 ">
                <div className="col-md-12 ">
                  <div className="search">
                    <div className="input-group">
                      <input className="form-control" placeholder="Search" ref={node => (this.searchNode = node)} type="text" />
                      <div className="input-group-btn ">
                        <button className="btn btn-primary" onClick={() => this.handlesearch()}>submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row grid">
              <div className="col-md-12 gridview">
                {movielist}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Explore