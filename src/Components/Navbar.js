import React,{Component} from "react";
import {Link} from "react-router-dom";
export default class Navbar extends Component{
    render(){
        return (
            <div style={{display:"flex",backgroundColor:"green",padding:"0.5rem"}}>
                <Link style={{textDecoration:"None", color:"white"}} to="/"><h1 style={{paddingLeft:"2rem",paddingTop:"1rem"}}>Movies</h1></Link>
                <Link style={{textDecoration:"None",color:"white"}} to="/favourites"><h2 style={{marginLeft:"5rem",marginTop:"1.55rem"}}>Favourites</h2></Link>
            </div>
        )
    }
}

// Link is similar to anchor tag <a>, but Link doesn't refresh the page, so the states remain the same, but anchor refreshes the page