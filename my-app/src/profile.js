import React from 'react'
import Staffform from './staffform';
import Customerform from './customerform';

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            staff_flag:false,
            customer_flag:false,

        }
    }
    logout=()=>{
        localStorage.removeItem("email")
        alert("You Successfully Logged out")
        this.props.history.push('/login')
    }
    changeStaff=()=>{
        console.log("inside the change")
        if(this.state.staff_flag === true){
            this.setState({staff_flag:false})
        }
        else{
            this.setState({staff_flag:true,customer_flag:false})
        }
        
    }
    changeCustomer=()=>{
        console.log("inside the change")
        if(this.state.customer_flag === true){
            this.setState({customer_flag:false})
        }
        else{
            this.setState({customer_flag:true,staff_flag:false})
        }
        
    }
    render(){
        return(
            <div>
            <nav style={{backgroundColor:"#e11c26"}}>
              <div className="container">
                  <h1 style={{color:"white"}}>Drupal <button class="btn" style={{float:"right",backgroundColor:"white",color:"#e11c26"}} onClick={this.logout}>Logout</button></h1>
                
                <nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <ul class="nav navbar-nav">
                            <li><a href="#" onClick={this.changeStaff}>Staff</a></li>
                            <li><a href="#" onClick={this.changeCustomer}>Customers</a></li>
                        </ul>
                    </div>
                </nav>
                
              </div>
            </nav>
            {this.state.staff_flag ? <Staffform toggle={this.changeStaff}/> :""}
            {this.state.customer_flag ? <Customerform toggle={this.changeCustomer}/> :""}
            
          </div>
        )
    }
}
export default Profile