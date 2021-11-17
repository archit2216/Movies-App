import React,{ Component } from "react";
import {movies} from "./getMovies.js";
import axios from "axios";
export default class Movies extends Component{
    constructor(){
        super();
        this.state={
            hower:"",
            parr:[1],
            currPage:1,
            movies:[],
            favourites:[]
        }
    }
    async componentDidMount(){
        const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=2e86ef23b3c09d012ef556280f2ed2cb&language-en-US&page=${this.state.currPage}`);
        const data=res.data;
        this.setState({
            movies:[...data.results]
        })
    }
    changeMovies=async()=>{
        const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=2e86ef23b3c09d012ef556280f2ed2cb&language-en-US&page=${this.state.currPage}`);
        const data=res.data;
        this.setState({
            movies:[...data.results]
        })
    }
    handleleft=()=>{
        if(this.state.currPage!==1){
        this.setState({
            currPage:this.state.currPage-1
        }, this.changeMovies);  // to avoid the issue below
    }
        
    }
    handleright=()=>{
        let temparr=[];
        for(let i=1;i<=this.state.parr.length+1;i++){
            temparr.push(i);
        }
      
        this.setState({
            parr:[...temparr],
            currPage:this.state.currPage+1
        },this.changeMovies)
        // this.changeMovies(); not writing here becoz this.setState is not synchronus, so changeMovies get called before state is changed
    }
   handleNum=(val)=>{
       if(val!==this.state.currPage){
           this.setState({
               currPage:val
           },this.changeMovies);
       }
   }
   handleFav=(item)=>{
       let oldData=JSON.parse(localStorage.getItem("movies-app")||"[]");
       if(this.state.favourites.includes(item.id)){
        oldData=oldData.filter((mov)=>mov.id!==item.id);
       }else{
           oldData.push(item);
       }
       localStorage.setItem("movies-app",JSON.stringify(oldData));  //movies is the name given to local storage
       console.log(oldData);
       this.handleFavState();
   }
   handleFavState=()=>{
    let oldData=JSON.parse(localStorage.getItem("movies-app")||"[]");
    let temp=oldData.map((mov)=>mov.id);
    this.setState({
        favourites:[...temp]
    });
   }
    render(){
        
        return(
        this.state.movies.length===0?<div class="spinner-border text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>:
      <div>
          <h3 style={{textAlign:"center"}}>Trending</h3>
          <div className="movie-list">
              {
                  this.state.movies.map((item)=>(
                    <div className="card movie-card" onMouseEnter={()=>this.setState({hower:item.id})} onMouseLeave={()=>this.setState({hower:""})}>
                    <img className="movie-img card-img-top" src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}  alt={item.name}/>
                    <h5 className="card-title movie-title">{item.original_title==null?item.name:item.original_title}</h5>
                    <div className="button-wrapper movie-button" style={{display:"flex", flexWrap:"wrap",justifyContent:"center"}}>
                    {
                        this.state.hower===item.id?<p>{item.overview.slice(0,70)}</p>:<p></p>
                    }
                    {
                        this.state.hower===item.id?<a className="btn btn-primary" onClick={()=>this.handleFav(item)}>{this.state.favourites.includes(item.id)?"Remove From Favourite":"Add To Favourites"}</a>:null
                    }
                    </div>
  </div>
                  ))
              }
          </div>
          <div style={{display:"flex",justifyContent:"center"}}>
          <nav aria-label="Page navigation example">
  <ul class="pagination">
  <li class="page-item"><a class="page-link" onClick={this.handleleft}>Previous</a></li>
  {
      this.state.parr.map((index)=>(
        <li class="page-item"><a class="page-link" onClick={()=>{this.handleNum(index)}}>{index}</a></li>
      ))
  }
    <li class="page-item"><a class="page-link" onClick={this.handleright}>Next</a></li>
  </ul>
</nav>
</div>
      </div>
        )
    }
}