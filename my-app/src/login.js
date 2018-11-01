import React from 'react'
import {Link} from 'react-router-dom'
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            emailValid:"",
            dataValid:""
          }
        }
        handleChange=(e)=>{
          this.setState({[e.target.name]:e.target.value})
        }
        email_valid=()=> {
          const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
          if (reg.test(this.state.email) === true){
              return true;
          }
          else{
              return false;
          }
        }
        sendData=(e)=>{
          e.preventDefault();
          if(this.email_valid())
          {
            this.setState({emailValid:"",dataValid:""});
            let options={
              method:"POST",
              headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
              },
              body:JSON.stringify(this.state)
            }
            fetch("http://localhost:8085/login",options)
            .then(res=>{
              console.log("response",res)
              return res.json();
            })
            .then(data=>{
              console.log("data fetched",data,data[0].email,data[0].password)
              if((data[0].email === this.state.email) && (data[0].password === this.state.password)){
                this.setState({dataValid:"Login Successful"})
                localStorage.setItem("email",this.state.email)
                localStorage.setItem("name",data[0].name)
                console.log("localstorage email",localStorage.getItem("email"),localStorage.getItem("name"))
                alert("You Successfully Logged in")
                this.props.history.push(`/profile`)
              }
              else{
                this.setState({dataValid:"Login Unsuccessful"})
              }
            })
            .catch(err=>{
              this.setState({dataValid:"Login Unsuccessful"})
              console.log("error in fetch all",err)
            })
          }
          else{
            this.setState({emailValid:"Invalid Email"})
          }
        }
    render(){
        return(
            <div>
            <nav className="navbar navbar-expand-lg fixed-top" style={{backgroundColor:"#e11c26"}}>
                <h1 style={{color:"white",paddingLeft:"2rem"}}>Drupal</h1>
            </nav>
            <center><h1>Login</h1></center>
            <div class="container" style={{paddingLeft:"10%",paddingRight:"10%"}}>
            <form>
           
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" name="email" value={this.state.email} onChange={this.handleChange} aria-describedby="emailHelp" placeholder="Enter email"/>
    
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password"/>
  </div>
  <p>{this.state.email.length === 0 || this.email_valid() === false ? this.state.emailValid : this.state.dataValid}</p>
  <button type="submit" onClick={this.sendData} class="btn btn-primary">Login</button>
  <br/><br/>
  <div className="section-title text-center center">
    <p>I do not have any account yet.<br />
        <Link to="/signup">Create My Account Now !</Link>
    </p>
  </div>
</form>       
            </div>
          </div>
        )
    }
}
export default Login