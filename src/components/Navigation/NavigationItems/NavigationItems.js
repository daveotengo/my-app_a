import React, { Component } from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import {useNavigate,useLocation} from 'react-router-dom';


class NavigationsItems extends Component{



  render () {
    console.log("printing location pathname on navitems")
    console.log(this.props.location.pathname);
    let activ = false;
    let activ1 = false;
    let activ2 = false;
    const locationHome="/";
    const locationOrders="/orders";
    const locatonAuth="/auth"


    if(this.props.location.pathname==locationHome){
      activ = true;
    }

    if(this.props.location.pathname==locationOrders){
      activ1 = true;
    }

    if(this.props.location.pathname==locatonAuth){
      activ2 = true;
    }

  return(
  <ul className={classes.NavigationItems}>
    
    <NavigationItem link={locationHome} active={activ} >Burger Builder</NavigationItem>
    
    {/* <NavigationItem link={locationOrders} active={activ1}>Orders</NavigationItem> */}

    {/* <NavigationItem link="/auth" active={activ2} >Authenticate</NavigationItem> */}
    {this.props.isAuthenticated && <NavigationItem link={locationOrders} active={activ1}>Orders</NavigationItem>}
    {!this.props.isAuthenticated ?
      <NavigationItem link={locatonAuth} active={activ2}>Authenticate</NavigationItem>
      : <NavigationItem link="/logout">Logout</NavigationItem>} 
  </ul>
  )}
};

function WithNavigate(props) {
  let navigate = useNavigate();
  const location = useLocation();

  //return <Blog {...props} navigate={navigate} location={location} />
  return <NavigationsItems {...props} navigate={navigate} location={location} />
}


export default WithNavigate;
