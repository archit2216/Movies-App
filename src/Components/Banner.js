import React,{ Component } from "react";
import {movies} from "./getMovies.js";

export default class Banner extends Component{
    render(){
        const movie=movies.results[0];
        return(
        movie===''?<div class="spinner-border text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>:
            <div className="card banner-card" >
<img className="banner-img card-img-top" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}  alt={movie.name}/>

    <h1 className="card-title banner-title">{movie.original_title}</h1>
    <p className="card-text banner-text">{movie.overview}</p>
  </div>
        )
    }
} 

