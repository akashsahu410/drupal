import React from 'react'
import Dropzone from 'react-dropzone'
import Customerdata from './customerdata.js'
class Customerform extends React.Component{
    state={
        name:"",
        username:"",
        service:"A",
        phone:"",
        address:"",
        email:"",
        images:null,
        preview:null,
        warning:"",
        customerdata:"",
        formshow:true,
        searchname:"",
        searchCustomerData:"",
        searchflag:false,
    }
    // componentDidMount(){
    //     console.log("inside the component did mount of Customer form")
    //     let options={
    //         method:"POST",
    //         headers:{
    //             Accept:"application/json",
    //             "Content-Type":"application/json",
    //         },
    //     }
    //     fetch("http://localhost:8085/profile/customerfind",options)
    //     .then(res=>{
    //         console.log("response post of customer",res)
    //         return res.json();
    //     })
    //     .then(data=>{
    //         console.log("data get in mount of customer",data.userdata)
    //         this.setState({customerdata:data.userdata})
    //         console.log("Customer Data",this.state.customerdata)

    //     })
    //     .catch(err=>{
    //         console.log("error occured in did mount of customer",err)
    //     })
    // }
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
            formData.append("username",this.state.username)
            formData.append("service",this.state.service)
            formData.append("phone",this.state.phone)
            formData.append("address",this.state.address)
            formData.append("email",this.state.email)
            formData.append("images",this.state.images)  
            let options={
                method:"POST",
                body:formData
            }
            console.log("options",options)
            fetch("http://localhost:8085/profile/customerform",options)
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
            fetch("http://localhost:8085/profile/searchcustomer",options)
            .then(res=>{
              console.log("response",res);
              return res.json();
            })
            .then(data=>{
              console.log("data",data)
              if(this.state.searchflag === true){
                this.setState({searchCustomerData:data.customerdata})
              }
              else{
              this.setState({searchCustomerData:data.customerdata,formshow:false,searchflag:true})
              console.log("serahc customer",this.state.searchCustomerData)
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
                 <label for>Search Customer data</label>
                 <div class=" w3-xlarge">
                    <input type="text" class="form-control input-sm" name="searchname" onChange={this.handleChange} onFocus={this.onSearch} onBlur={this.onSearch} placeholder="Enter Customer Name"/>
                    <button type="submit" class="btn btn-primary" onClick={this.onSearchData}>Search</button>
                 </div>
                 
{this.state.formshow === true ?
(<div><center><h1>Customer Form</h1></center>

<form>
<div class="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input type="text" class="form-control" placeholder="Enter name" name="name" value={this.state.name} onChange={this.handleChange}/>
    
  </div>

<div class="form-group">
    <label for="exampleInputEmail1">Username</label>
    <input type="text" class="form-control" placeholder="Enter Username" name="username" value={this.state.username} onChange={this.handleChange}/>
    
  </div>

<div className="form-group">
<label for="exampleInputEmail1">Services</label>
    <select className="form-control" name="service" value={this.state.service} onChange={this.handleChange}>        
         <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
    </select>
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
  
</form> </div>) : ""}  
{this.state.searchflag === true ? 
(<div>
<center><h1>Customer Details</h1></center><br/>
 <label for><a href="#" onClick={this.onSearch} style={{color:"#e11c26"}}>&lt; Back to Customer Form </a></label><br/><br/>
    <table class="table table-striped">
        <thead class="thead-light">
        <tr>
            <td>Name</td>
            <td>Username</td>
            <td>Service</td>
            <td>Phone</td>
            <td>Address</td>
            <td>Email</td>
            <td>Image</td>
        </tr>
        </thead>
        <tbody>
    {this.state.searchCustomerData.length>0 ? (this.state.searchCustomerData.map(x=>
        
            <Customerdata param={x} refresh={this.onSearchData}/>
        
    )) : ""}
    </tbody>
    </table>
</div>) :""}
</div>
            </div>
        )
    }
}
export default Customerform;

