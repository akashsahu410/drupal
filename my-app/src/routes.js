import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Home from './home'
import Signup from './signup'
import Login from './login'
import Profile from './profile'
import Editcustomer from './editcustomer'
import Editstaff from './editstaff'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      localStorage.getItem("email") !=null
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )
  //to check for login and signup 
  const Private = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      localStorage.getItem("email") !=null
        ? <Redirect to='/profile' />
        : <Component {...props} />
    )} />
  )
class Routes extends React.Component{

    render(){
        return(
            <div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/home" component={Home}/>
                    <PrivateRoute path="/profile" component={Profile}/> 
                    <PrivateRoute path="/edit_customer" component={Editcustomer}/> 
                    <PrivateRoute path="/edit_staff" component={Editstaff}/> 
                    <Private path="/signup" component={Signup}/>
                    <Private path="/login" component={Login}/>
                    </Switch>
            </div>
        )
    }
}
export default Routes;
