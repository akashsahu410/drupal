import React,{Component} from 'react'
import {Link} from 'react-router-dom'

class Staffdata extends Component{
    constructor(props){
        console.log("data",props.param)
    super(props);
    this.state={
        data:props.param,
    }
}
edit=()=>{
    localStorage.setItem("staff",this.state.data.email)
    console.log("inside edit function",localStorage.getItem("staff"))
    
}
deleteData=(e)=>{
    e.preventDefault();
    console.log("inside the delete data function")
        let options={
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify({email:this.state.data.email})
        }
        fetch("http://localhost:8085/profile/deletestaff",options)
        .then(res=>{
            console.log("response post of delete staff ",res)
            return res.text();
        })
        .then(data=>{
            console.log("data of delete staff",data)
            if(data === "Data deleted")
            {
                // alert(data)
                this.props.refresh(e)
            }
        })
        .catch(err=>{
            console.log("error occured in delete of staff",err)
        })
}
    render(){
        return(
            
                <tr>
                <td>{this.state.data.designation}</td>
                <td>{this.state.data.name}</td>
                <td>{this.state.data.email}</td>
                <td>{this.state.data.phone}</td>
                <td>{this.state.data.address}</td>
                <td>{this.state.data.joiningdate}</td>
                <td><img src={`http://localhost:8085/${this.state.data.images}`} height="50" width="50"/></td>
                <td><Link to='/edit_staff'><a href="#" onClick={this.edit}><b>Edit</b></a></Link></td>
                <td><a href="#" onClick={this.deleteData}><b>Delete</b></a></td>
            </tr>
            
        )
    }
}
export default Staffdata;