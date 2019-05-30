import React, { Component } from 'react'
import './moviedetails.css'
import Menu from '../Menu/menu'
import axios from 'axios';
import _ from 'lodash';

/* Movie details page */
class MovieDetails extends Component {

    movierate = 0;

    constructor() {
        super();
        this.state = {
            movies: [],
            rating: false,
            slidervalue: 10,
        };
    }
    
    /* Fetch details for provided movie id */
    componentDidMount() {
        axios.get(`http://www.omdbapi.com/?apikey=a07c89dc&i=${this.props.match.params.id}`)
            .then(res => {
                const movies = [res.data];
                this.setState({ movies });
            })
    }

    /* Handle rating slider bar */
    handlerating = () => {
        this.setState({
            rating: true
        })
    }

    /* Handle rating values */
    handleChange = () => {
        let movielist = [];
        this.setState({
            slidervalue: this.sliderNode.value
        })
        if (this.sliderNode.value <= 3) {
            this.movierate = 'Less'

        } else if ((this.sliderNode.value > 3) && (this.sliderNode.value <= 6)) {
            this.movierate = 'good'

        } else {
            this.movierate = 'extreme'
        }
        if (localStorage.getItem("movielist") === null) {
            var movietitle = {
                "rate": this.movierate,
                "id": this.props.match.params.id,
                "title": this.state.movies[0].Title,
                "year": this.state.movies[0].Year,
                "type": this.state.movies[0].Type,
                "poster": this.state.movies[0].Poster,
                "imdbrating": this.state.movies[0].imdbRating,
            }
            movielist.push(movietitle)
            localStorage.setItem('movielist', JSON.stringify(movielist))

        } else {
            let oldstore = JSON.parse(localStorage.getItem("movielist"))
            const filterarray = _.filter(oldstore, ['id', this.props.match.params.id])
            if (filterarray !== '') {
                _.remove(oldstore, item => item.id === this.props.match.params.id);
                var newstore = {
                    "rate": this.movierate,
                    "id": this.props.match.params.id,
                    "title": this.state.movies[0].Title,
                    "year": this.state.movies[0].Year,
                    "type": this.state.movies[0].Type,
                    "poster": this.state.movies[0].Poster,
                    "imdbrating": this.state.movies[0].imdbRating,
                }
                oldstore.push(newstore)
                localStorage.setItem("movielist", JSON.stringify(oldstore));
            } else {
                var newstore = {
                    "rate": this.movierate,
                    "id": this.props.match.params.id,
                    "title": this.state.movies[0].Title,
                    "year": this.state.movies[0].Year,
                    "type": this.state.movies[0].Type,
                    "poster": this.state.movies[0].Poster,
                    "imdbrating": this.state.movies[0].imdbRating,
                }
                oldstore.push(newstore)
                localStorage.setItem("movielist", JSON.stringify(oldstore));
            }
        }
    }

    render() {

        const userrating = <div className="slider"><span className="sl-range">{this.state.slidervalue}</span>
            <input type="range" min="1" max="10" ref={node => (this.sliderNode = node)} name='val_blur'
                onChange={(e) => { this.handleChange() }} />
        </div>

        const moviedetails = _.map(this.state.movies, item => (
            <div className="col-md-12 movieview">
                <div className="col-md-4">
                    <img src={item.Poster} alt={item.Title} />
                </div>
                <div className="col-md-8">
                    <div className="details_title">{item.Title}</div>
                    <p> <i className="fa fa-language t-pad" aria-hidden="true"></i>{item.Language}</p>
                    <p> <i className="fa fa-video-camera t-pad" aria-hidden="true"></i>{item.Genre}</p>
                    <p> <i className="fa fa-calendar t-pad" aria-hidden="true"></i>{item.Released}</p>
                    <p> <i className="fa fa-clock-o t-pad" aria-hidden="true"></i>{item.Runtime}</p>
                    <p>
                        {_.map(item.Ratings, rate => (
                            <span> <i className="fa fa-star-half-o t-pad" aria-hidden="true"></i>{rate.Source} : {rate.Value}<span className="t-pad-left">|</span></span>
                        ))}
                    </p>
                    <p> <i className="fa fa-users t-pad" aria-hidden="true"></i>{item.Actors}</p>
                    <p> <i className="fa fa-film t-pad" aria-hidden="true"></i>{item.Plot}</p>
                    <p> <i className="fa fa-pencil-square-o t-pad" aria-hidden="true"></i>{item.Writer}</p>
                    <div>
                        <button className="btn btn-primary" onClick={() => this.handlerating()}><i className="fa fa-star-o t-pad" aria-hidden="true"></i>Rate it</button>
                        {this.state.rating ? userrating : ''}
                    </div>
                </div>
            </div>
        ))

        return (
            <div>
                <Menu />
                <div className="container-fluid">
                    <div className="container">
                        <div className="row">
                            {moviedetails}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MovieDetails