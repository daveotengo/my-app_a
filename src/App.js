import reactDom from 'react-dom';
import './App.module.css';
import Layout from './components/Layouts/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
//import { ConnectedRouter } from "connected-react-router";
//import configureStore, { history } from "./redux/configureStore";
import Aux from './hoc/Aux'
import {connect} from 'react-redux'
import * as actions from './store/actions/auth_actions';
//../../store/action

import Checkout from './containers/Checkout/Checkout'
import {Route,Routes} from 'react-router-dom'
import ContactData from './containers/Checkout/ContactData/ContactData';
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import { Component } from 'react';


//function App() {
 class App extends Component {

  componentDidMount(){
    console.log("printing isAuthenticated");
    console.log(this.props.isAuthenticated);
    this.props.onTryAutoSignUp();
  }

  componentDidUpdate(){
    console.log("printing isAuthenticated");
    console.log(this.props.isAuthenticated);
  }
   render (){

let routes = ( <Routes> 
<Route  path="/" element={<BurgerBuilder />} />

<Route path="/checkout"  element={<Checkout />} />

<Route path="/contact-data"  element={<Aux>{<Checkout />}<ContactData /></Aux>} />

<Route path="/orders" element={<Orders/>} /> 

<Route path="/auth" element={<Auth/>} /> 

<Route path="/logout" element={<Logout/>} /> 
            </Routes>);

            // if(this.props.isAuthenticated){
            //   routes = ( <Routes> 
            //     <Route  path="/" element={<BurgerBuilder />} />
              
            //               </Routes>)
            // }

           

  return (
    <div >
      <Layout>
         
               {routes}

                

     {/* <BurgerBuilder   /> */}

      </Layout>
     
    </div>
  
  );
   }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated : state.auth.token !== null
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
