import React,{Component} from 'react'
import Dropzone from 'react-dropzone'
import {Link} from 'react-router-dom'
class Editstaff extends Component{
    state={
        staffdata:"",
        _id:"",
        name:"",
        email:"",
        phone:"",
        address:"",
        designation:"",
        joiningdate:"",
        images:null,
        preview:null,
        warning:"",
        imageshow:true
    }
    componentDidMount(){
        console.log("inside the component did mount of staff edit profile",this.props)
        let options={
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify({email:localStorage.getItem("staff")})
        }
        fetch("http://localhost:8085/profile/stafffind",options)
        .then(res=>{
            console.log("response post of Staff",res)
            return res.json();
        })
        .then(data=>{
            console.log("data get in mount of Staff ",data.userdata[0])
            this.setState({_id:data.userdata[0]._id,name:data.userdata[0].name,email:data.userdata[0].email
                ,phone:data.userdata[0].phone,address:data.userdata[0].address,joiningdate:data.userdata[0].joiningdate,
                designation:data.userdata[0].designation,images:data.userdata[0].images
            })
            console.log("Staff Data",this.state)

        })
        .catch(err=>{
            console.log("error occured in did mount of Staff ",err)
        })
    }
    onSendData=(e)=>{
        e.preventDefault();
        console.log("state",this.state)
        if(this.email_valid()){
            this.setState({warning:""})
            let formData  = new FormData();
            formData.append("id",this.state._id)
            formData.append("name",this.state.name)
            formData.append("email",this.state.email)
            formData.append("phone",this.state.phone)
            formData.append("address",this.state.address)
            formData.append("designation",this.state.designation)
            formData.append("joiningdate",this.state.joiningdate)
            formData.append("images",this.state.images)  
            let options={
                method:"POST",
                body:formData
            }
            console.log("options",options)
            fetch("http://localhost:8085/profile/editstaff",options)
            .then(res=>{
              console.log("response",res);
              return res.text();
            })
            .then(data=>{
              console.log("data",data)
              if(data === "Changed Successfully"){
                  localStorage.removeItem("staff")
                  alert(data)
                  this.props.history.push("/profile")
              }
              else{
                  this.setState({warning:"Email already exists"})
              }
            })
            .catch(err=>{
              console.log("error in fetch call",err)
            })
        }
        else{
            this.setState({warning:"Invalid Email"})
        }
          
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value.toLowerCase()})
    }
    handleDrop=(acceptetedFiles,rejectFiles)=> {
        console.log("accepted files",acceptetedFiles[0])
        this.setState({ images:acceptetedFiles[0],preview:acceptetedFiles[0].name,imageshow:false});
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
render(){
return(
<div>
<nav style={{backgroundColor:"#e11c26"}}>
              <div className="container">
                  <h1 style={{color:"white"}}>Drupal <button class="btn" style={{float:"right",backgroundColor:"white",color:"#e11c26"}} onClick={this.logout}>Logout</button></h1>
              </div>
            </nav><br/>
<label for><Link to="/profile"><a href="#" style={{color:"#e11c26"}}>&nbsp;Back to Profile</a></Link></label>
    <div class="container" style={{padding:"2%"}}>
     <center><h1>Edit Staff Profile</h1></center>
        <form>
        <div class="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input type="text" class="form-control" placeholder="Enter name" name="name" defaultValue={this.state.name} onChange={this.handleChange}/>    
        </div>

        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control"  name="email" defaultValue={this.state.email} onChange={this.handleChange}  placeholder="Enter email"/>
            <p>{this.state.warning.length>0 ? this.state.warning :""}</p>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Phone</label>
            <input type="tel" class="form-control" name="phone" maxlength="10" defaultValue={this.state.phone} onChange={this.handleChange} placeholder="Enter Phone"/>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Address</label>
            <input type="text" class="form-control" name="address" defaultValue={this.state.address} onChange={this.handleChange} placeholder="Enter Address"/>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Designation</label>
            <input type="text" class="form-control" name="designation" defaultValue={this.state.designation} onChange={this.handleChange} placeholder="Enter Designation"/>
         </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Joining Date</label>
            <input type="text" class="form-control" name="joiningdate" defaultValue={this.state.joiningdate} onChange={this.handleChange} placeholder="Enter Joining date"/>
        </div>
        <div className="form-group">
        <label for="exampleInputPassword1">Image</label><br/>
        {this.state.imageshow === true ? <img src={`http://localhost:8085/${this.state.images}`} 
            height="100" width="100"/> : this.state.preview}
            <p>
                <Dropzone onDrop={ this.handleDrop } name="images" multiple={false} accept="image/jpeg,image/jpg,image/tiff,image/gif" height="200" width="200">
                    Upload your profile pic
                </Dropzone>                    
            </p>
        </div>
        <button type="submit" class="btn btn-primary" onClick={this.onSendData}>Submit</button>
        
        <br/><br/>
        
        </form> 
    </div>
</div>)
}
}
export default Editstaff;