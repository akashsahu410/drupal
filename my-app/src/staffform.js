import React from 'react'
import Dropzone from 'react-dropzone'
import Staffdata from './staffdata'
class Staffform extends React.Component{
    state={
        name:"",
        email:"",
        phone:"",
        address:"",
        designation:"",
        joiningdate:"",
        images:null,
        preview:null,
        warning:"",    
        staffdata:"",
        formshow:true,
        searchname:"",
        searchStaffData:"",
        searchflag:false
    }
    onSearch=(e)=>{
        console.log("inside the on serch function",e.type)
        if(e.type === 'focus'){
            this.setState({formshow:false})
        }
        else{
            this.setState({formshow:true,searchflag:false})
        }
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value.toLowerCase()})
    }
    // componentDidMount(){
    //     console.log("inside the component did mount of staff form")
    //     let options={
    //         method:"POST",
    //         headers:{
    //             Accept:"application/json",
    //             "Content-Type":"application/json",
    //         },
    //     }
    //     fetch("http://localhost:8085/profile/stafffind",options)
    //     .then(res=>{
    //         console.log("response post staff did mount",res)
    //         return res.json();
    //     })
    //     .then(data=>{
    //         console.log("data get staff form",data.userdata)
    //         this.setState({staffdata:data.userdata})
    //         console.log("staff form data",this.state.staffdata)

    //     })
    //     .catch(err=>{
    //         console.log("error occured in did mount of staff form",err)
    //     })
    // }
    handleDrop=(acceptetedFiles,rejectFiles)=> {
        console.log("accepted files",acceptetedFiles[0])
        this.setState({ images:acceptetedFiles[0],preview:acceptetedFiles[0].name});
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
      onSendData=(e)=>{
        e.preventDefault();
        console.log("state",this.state)
        if(this.email_valid()){
            this.setState({warning:""})
            let formData  = new FormData();
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
            fetch("http://localhost:8085/profile/staffform",options)
            .then(res=>{
              console.log("response",res);
              return res.text();
            })
            .then(data=>{
              console.log("data",data)
              if(data === "Registered Successfully"){
                  alert(data)
                  this.props.toggle();
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
    onSearchData=(e)=>{
        e.preventDefault();
        console.log("state",this.state)
        let options={
            method:"POST",
            headers:{
              Accept:"application/json",
              "Content-Type":"application/json"
            },
            body:JSON.stringify({name:`.*${this.state.searchname}.`})
        }
            console.log("options",options)
            fetch("http://localhost:8085/profile/searchstaff",options)
            .then(res=>{
              console.log("response",res);
              return res.json();
            })
            .then(data=>{
              console.log("data",data)
              if(this.state.searchflag === true){
                this.setState({searchStaffData:data.staffdata})
              }
              else{
              this.setState({searchStaffData:data.staffdata,formshow:false,searchflag:true})
              console.log("serahc staff",this.state.searchStaffData)
              }
            })
            .catch(err=>{
              console.log("error in fetch call",err)
            })
        }
    render(){
        return(
            <div>
                 <div class="container" style={{padding:"5%"}}>
                 <label for>Search Staff data</label>
                 <div class=" w3-xlarge">
                    <input type="text" name="searchname"class="form-control input-sm" onFocus={this.onSearch} onChange={this.handleChange} onBlur={this.onSearch} placeholder="Enter Staff Name"/>
                    <button type="submit" class="btn btn-primary" onClick={this.onSearchData}>Search</button>
                 </div>
                 
{this.state.formshow === true ?
    (<div>
                 <center><h1>Staff Form</h1></center>
             <form>
            <div class="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input type="text" class="form-control" placeholder="Enter name" name="name" value={this.state.name} onChange={this.handleChange}/>
    
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control"  name="email" value={this.state.email} onChange={this.handleChange} aria-describedby="emailHelp" placeholder="Enter email"/>
    <p>{this.state.warning.length>0 ? this.state.warning :""}</p>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Phone</label>
    <input type="tel" class="form-control" name="phone" maxlength="10" value={this.state.phone} onChange={this.handleChange} placeholder="Enter Phone"/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Address</label>
    <input type="text" class="form-control" name="address" value={this.state.address} onChange={this.handleChange} placeholder="Enter Address"/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Designation</label>
    <input type="text" class="form-control" name="designation" value={this.state.designation} onChange={this.handleChange} placeholder="Enter Designation"/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Joining Date</label>
    <input type="text" class="form-control" name="joiningdate" value={this.state.joiningdate} onChange={this.handleChange} placeholder="Enter Joining date"/>
  </div>

<div className="form-group">
<label for="exampleInputPassword1">Image</label>
    <p>
        <Dropzone onDrop={ this.handleDrop } name="images" multiple={false} accept="image/jpeg,image/jpg,image/tiff,image/gif" height="200" width="200">
            Upload your profile pic
        </Dropzone>
    { this.state.preview}
                                
    </p>
</div>

  <button type="submit" class="btn btn-primary" onClick={this.onSendData}>Submit</button>
  
  <br/><br/>
  
</form>  </div>) : ""}   
{this.state.searchflag === true ? 
(<div>
<center><h1>Staff Details</h1></center><br/>
<label for><a href="#" onClick={this.onSearch} style={{color:"#e11c26"}}>&lt; Back to Staff Form </a></label><br/><br/>
    <table class="table table-striped">
        <thead>
        <tr>
            <td>Designation</td>
            <td>Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Address</td>
            <td>Joining date</td>
            <td>Image</td>
        </tr>
        </thead>
        <tbody>
    {this.state.searchStaffData.length>0 ? (this.state.searchStaffData.map(x=>
        
        <Staffdata param={x} refresh={this.onSearchData}/>
        
    )) : ""}
    </tbody>
    </table>
    
</div>) :""}
</div>
            </div>
        )
    }
}
export default Staffform;

