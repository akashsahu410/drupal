import React from 'react'
import {Link} from 'react-router-dom'

class Home extends React.Component{
        state={
                city:"",
                apikey:"3d35412447dfd5f5bb0ac2a6aff8be64",  //api key of openweather
                temperature:"",
                hpa:"",
                description:"",
                wind:"",
                clouds:"",
                humidity:"",
                articles:"",
                news:""
        }
        //to initialize the variables 
        handleChange=(e)=>{
            this.setState({[e.target.name]:e.target.value})
        }
        //it will run in starting
        componentDidMount()
        {
            fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=ec9e727adcbe4adf8c645d2b86d0edee")
            .then(res=>{
                console.log("res",res)
                return res.json()
            })
            .then(data=>{
                console.log("data",data)
                this.setState({news:data.articles})
            })
            .catch(err=>{
                console.log("error",err)
            })
        }
        //to get the temperature on button click
         getTemp=(e)=>{
            e.preventDefault();
            console.log("inside the fetch api ",this.state.city)
            if(this.state.city.length > 0)
            {
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${this.state.apikey}`)
                .then(res=>{
                console.log("response",res);
                return res.json()
        
                })
                .then(data=>{
                console.log("data",data,data.weather[0].description)
                this.setState({temperature:`${(data.main.temp-273.15).toFixed(1)}`,description:data.weather[0].description,hpa:data.main.pressure,wind:`${data.wind.speed} m/s`,
                clouds:`${data.clouds.all}%`,humidity:data.main.humidity,})
                console.log("state",this.state)
                })
                .catch(err=>{
                    console.log("error in fetch call",err)
                })
            }
         }
        
    render(){
        const homecss={
            margin:20,
            width:100,
            backgroundColor:"#e11c26",
            color:"white"
          };
          
        return(
            <div>
                <div>
                <nav className="navbar navbar-expand-lg fixed-top" style={{backgroundColor:"#e11c26"}}>
                    <h1 style={{color:"white",paddingLeft:"2rem"}}>Drupal</h1>                    
                </nav>
            
                <center>
                    <Link to="/login"> <button class="btn" style={homecss}>Login</button></Link>
                    <Link to="/signup"> <button style={homecss} class="btn">Signup</button></Link>
                    
                        <label>Temperature&nbsp;&nbsp;</label>
                        <input type="text"  placeholder="Enter city name" name="city"
                         value={this.state.city} onChange={this.handleChange}/>&nbsp;&nbsp;
                        <button type="submit" class="btn btn-primary" onClick={this.getTemp}>Search</button>
                     
                     {this.state.description.length>0 ? <p><b>{this.state.temperature}&deg;C</b><br/>{this.state.description}<br/>wind {this.state.wind}<br/>
                         clouds {this.state.clouds}<br/>{this.state.hpa} hpa<br/>humidity {this.state.humidity}%</p> : ""}
                </center>
                <div>
                    <br/><center><h1>News</h1><br/><br/>
                    {this.state.news.length>0 ? (this.state.news.map((x,key)=>{
                       return x.urlToImage !== null ? 
                        <div class="row">
                            <div class="col-md-2 col-md-offset-1">
                                <img class="img-responsive" src={`${x.urlToImage}`} height="400" width="300" alt-text={x.title}/>
                                <b><a href={x.url} target="_blank" rel="noopener noreferrer">{x.title}</a></b>
                                <p><b>Published:</b> {x.publishedAt.slice(0,10)} {x.publishedAt.slice(11,16)}</p>
                            </div>
                            <hr/>
                        </div>
                     : "" }
                    )) : ""}
                    </center>
                </div>
                </div>
          </div>
        )
    }
}
export default Home