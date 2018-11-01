import React from 'react'
import {Link} from 'react-router-dom'
class Home extends React.Component{
        state={
                }
    render(){
        const homecss={
            margin:20,
            width:100,
            backgroundColor:"#e11c26",
            color:"white"
          }
        return(
            <div>
                <div>
                <nav className="navbar navbar-expand-lg fixed-top" style={{backgroundColor:"#e11c26"}}>
                    <h1 style={{color:"white",paddingLeft:"2rem"}}>Drupal</h1>                    
                </nav>
            
                <center>
                    <Link to="/login"> <button class="btn" style={homecss}>Login</button></Link>
                    <Link to="/signup"> <button style={homecss} class="btn">Signup</button></Link>
                    
                </center>
                </div>
          </div>
        )
    }
}
export default Home