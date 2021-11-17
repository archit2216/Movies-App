import React,{Component} from "react";
import {movies} from "./getMovies.js";
export default class Favourite extends Component{
    constructor(){
        super();
        this.state={
            genres:[],
            currgen:"All genres",
            movies:[],
            currText:'',
            limit:5,
            currPage:1
        }
    }
    componentDidMount(){
        let genre={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",10770:"TV Movie",53:"Thriller",10752:"War",37:"Western",10759:"Action & Adventure"};
        let data=JSON.parse(localStorage.getItem("movies-app")||"[]");
        let temp=[];
        console.log(data);
        data.forEach((item)=>{
            if(item!==undefined && !temp.includes(genre[item.genre_ids[0]])){
                temp.push(genre[item.genre_ids[0]]);
            }
        });
        temp.unshift("All genres");
        this.setState({
            genres:[...temp],
            movies:[...data]
        })
    }
    handleGenreChange=(gen)=>{
        this.setState({
            currgen:gen
        });
    }
    handlePopDesc=()=>{
        let temp=this.state.movies;
        temp.sort((a,b)=>{
            return b.popularity-a.popularity;
        });
        this.setState({
            movies:[...temp]
        });
    }
    handlePopAsc=()=>{
        let temp=this.state.movies.sort((a,b)=>{
            return a.popularity-b.popularity;
        });
        this.setState({
            movies:[...temp]
        })
    }
    handleRatDesc=()=>{
        let temp=this.state.movies.sort((a,b)=>{
            return b.vote_average-a.vote_average;
        });
        this.setState({
            movies:[...temp]
        });
    }
    handleRatAsc=()=>{
        let temp=this.state.movies.sort((a,b)=>{
            return a.vote_average-b.vote_average;
        });
        this.setState({
            movies:[...temp]
        });
    }
    handlePageChange=(page)=>{
        this.setState({
            currPage:page
        })
    }
    handleDelete=(id)=>{
        let newArr=this.state.movies.filter((item)=>{
            return item.id!=id
        });
        this.setState({
            movies:[...newArr]
        });
        localStorage.setItem("movies-app",JSON.stringify(newArr));
    }
    render(){
    //     const movie=movies.results;
    // console.log(movie);
    // let temp=[];
    
    // this.setState({
    //     genres:[...temp]
    // })
    // console.log(temp);

    let genre={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",10770:"TV Movie",53:"Thriller",10752:"War",37:"Western",10759:"Action & Adventure"};     
    let filterArray=[];
    if(this.state.currText==="All genres"){
        filterArray=this.state.movies;
    }else{
        filterArray=this.state.movies.filter((item)=>{
            let title=item.title.toLowerCase()
            return title.includes(this.state.currText.toLowerCase())
        })
    }
    if(this.state.currgen!=="All genres"){
        filterArray=this.state.movies.filter((item)=>
            genre[item.genre_ids[0]]===this.state.currgen
        )
    }
    let pages=Math.ceil(filterArray.length/this.state.limit);
    let pagesArr=[];
    for(let i=1;i<=pages;i++){
        pagesArr.push(i);
    }
    let si=(this.state.currPage-1)*this.state.limit;
    let ei=si+this.state.limit;
    filterArray=filterArray.slice(si,ei);
    return(
            <div>
                <div className="main">
                    <div className="row">
                        <div className="col-lg-3 col-sm-12">
                        <ul class="list-group favourites-genres">
                        {
                            this.state.genres.map((GENRE)=>{
                                return(
                                    this.state.currgen===GENRE?
                                    <li class="list-group-item" style={{backgroundColor:"green", color:"white"}}>{GENRE}</li>
                                    :<li class="list-group-item" style={{backgroundColor:"white",color:"green"}} onClick={()=>this.handleGenreChange(GENRE)}>{GENRE}</li>
                                )
                            })
                        }
                        </ul>
                        </div>
                        <div className="col-lg-9 favourites-table col-sm-12">
                            <div className="row">
                            <input className="input-group-text col" type="text" placeholder="Search" value={this.state.currText} onChange={(e)=>this.setState({currText:e.target.value})}></input>
                            <input className="input-group-text col" type="number" placeholder="Rows count" value={this.state.currPage} onChange={(e)=>this.setState({currPage:e.target.value})}></input>
                            </div>
                            <div className="row">
                            <table class="table">
                            <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                <th scope="col"><i class="fas fa-sort-up" onClick={this.handlePopDesc}></i>Popularity<i class="fas fa-sort-down" onClick={this.handlePopAsc}></i></th>
                                <th scope="col"><i class="fas fa-sort-up" onClick={this.handleRatDesc}></i>Rating<i class="fas fa-sort-down" onClick={this.handleRatAsc}></i></th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {filterArray.map((item)=>{
                                return(
                                    <tr>
                                    <td><img style={{width:"5rem"}} src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}  alt={item.name}></img>{item.title==null?item.name:item.title}</td>
                                    <td>{genre[item.genre_ids[0]]}</td>
                                    <td>{item.popularity}</td>
                                    <td>{item.vote_average}</td>
                                    <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(item.id)}>Delete</button></td>
                                    </tr>
                                )
                            })}
                            </tbody>
                            </table>
                            </div>
                            <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            {pagesArr.map((page)=>(
                                <li class="page-item"><a class="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                            ))}
                        </ul>
                        </nav>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}