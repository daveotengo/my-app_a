import React from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import classes from './ContactData.module.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { checkValidity } from '../../../shared/utility';
import {useNavigate,useLocation} from 'react-router-dom';

class ContactData extends React.Component {

  componentDidMount(){

    console.log("in ContactData")
    console.log("component did mount");
    console.log(this.props);
    
  }

  componentDidUpdate(){
    console.log("in ContactData")
    console.log("component did update");

  }

  

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      postCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Postcode'
        },
        value: '',
        validation: {
          required: true,
          minLength: 7,
          maxLength: 7,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'medium', displayValue: 'Medium'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
        },
        value: 'cheapest',
        valid: true,
        validation: {},
      }
    },
    formIsValid: false,
  }

  orderHandler = (e) => {
    e.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm){
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    };
    const order = {
      ingredients: this.props.ings,
      //price should be on server side to prevent manipulation!
      price: this.props.price,
      orderData: formData,
      //userId: this.props.userId,
    }

    console.log("printing order");
    console.log(order);


      const postOrderRequest={
            ingredients : this.props.ings,
            price: this.props.price,
            customerName:{
              name:formData.name,
              address:{
                street: formData.street,
                zipcode: formData.zipcode,
                country: formData.country
            },
            email:formData.email,

            },
            deliverymethod:'fastest'
        }
        // axios.post('/orders.json',postOrderRequest)
        // .then(response=>{

        //   this.setState({loading:false,purchasing:false});

        //   console.log(response);

        //   this.props.navigate('/orders');

        // }).catch(error=>{
        //   this.setState({loading:false,purchasing:false});

        //   console.log("printing error");
        //   console.log(error);
        // });

    this.props.onOrderBurger(order);
  }

  inputChangedHandler = (event, inputIdentifier) => {
    //clones - for immutable
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm ){
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    }
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid,
    })
  }

  render(){
    const formElementsArray = [];
    for(let key in this.state.orderForm){
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = null;
    if(this.props.loading) {
      console.log("loading....")
      form = <Spinner />
    } else {
      form = (
        <form action="">
          {formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
          ))}
          <Button btnType='Success' disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
        </form>
      );

      //this.props.navigate('/orders');
    }
    return(
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.orders.loading,
    //token: state.auth.token,
    //userId: state.auth.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))

  }
}

//export default ContactData;

function WithNavigate(props) {
  let navigate = useNavigate();
  const location = useLocation();

  //return <Blog {...props} navigate={navigate} location={location} />
  return <ContactData {...props} navigate={navigate} location={location} />
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(WithNavigate,axios));

//export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));

