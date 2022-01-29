import { Component }  from 'react';

import { Link,Router,Routes,Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {useNavigate,useLocation} from 'react-router-dom';
import Aux from '../../hoc/Aux'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Checkout extends Component {

  state = {
    ingredients : {
      salad:0,
      bacon:0,
      cheese:0,
      meat:0
    }
  }

  componentDidMount(){

    console.log("in checkout");

    console.log("component did mount");

    console.log("printing ingredients");

    console.log(this.props.ings);

    console.log("printing locations");

    console.log(this.props.location);

    console.log("printing navigate");

    console.log(this.props.navigate);

    console.log("printing locaton search");

      console.log(this.props.location.search);

    const query = new URLSearchParams(this.props.location.search)

    console.log("loging query")

    console.log(query);

      const ingredients = {};

      for (let param of query.entries()){
        ingredients[param[0]] =+ param[1];
      }

      console.log("loging ingredients after loop");
      console.log(ingredients);

      this.setState({ingredients:ingredients});

  }

  checkoutCancelledHandler = () => {
    
    this.props.navigate(-1);
  }

  checkoutContinuedHandler = () => {

    const queryParams = [];
    for(let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) + "="+ encodeURIComponent(this.state.ingredients[i]));
    }

    const queryString = queryParams.join('&');

    //this.props.navigate("/checkout/"+"?" + queryString,{ state: { id: 1, name: 'sabaoon' } });

    this.props.navigate('/contact-data'+"?" + queryString);
  }

 

  render () {

    let checkoutSummary = null;

    checkoutSummary = (<Aux><CheckoutSummary
      //ingredients={this.props.ings}
      ingredients={this.state.ingredients}
      checkoutCancelled={this.checkoutCancelledHandler}
      checkoutContinued={this.checkoutContinuedHandler}

      
      
      />
      {/* <nav>
        <Link to="me">My Profile</Link>
      </nav> */}
      </Aux>
      )
    //let summary = <Route to="/" />
    let summary =null
   // if (this.props.ings) {
      //let purchasedRedirect = this.props.purchased ? <Route to="/" /> : null;
     
    //}

    
    return (
   
      <Aux>
      {/* {purchasedRedirect} */}
      {checkoutSummary}
      {/* {<ContactData />} */}
      
      {/* <Routes>    */}
         
                {/* <Route path="/checkout/me" exact element={<ContactData />} /> */}
                {/* <Navigate to="/checkout/me"/> */}

            {/* </Routes> */}
           

        
</Aux>
    
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.orders.purchased
  }
};


//export default connect(mapStateToProps, null)(Checkout);
//export default Checkout;


function WithNavigate(props) {
  let navigate = useNavigate();
  const location = useLocation();
  //(withErrorHandler(ContactData, axios)
  return <Checkout {...props} navigate={navigate} location={location} />;
}

export default   withErrorHandler(WithNavigate,axios);
