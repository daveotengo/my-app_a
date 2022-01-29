import { Component } from "react";
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BulidControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {useNavigate,useLocation} from 'react-router-dom';
import Checkout from '../Checkout/Checkout'
import {Route,Routes} from 'react-router-dom'
import ContactData from '../Checkout/ContactData/ContactData';
import Orders from '../Orders/Orders'
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import { Navigate } from 'react-router-dom';





const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
};

class BurgerBuilder extends Component{

   

    state = {
        ingredients:null,

      //   ingredients:{
      //     salad:0,
      //     bacon:0,
      //     cheese:0,
      //     meat:0
      // },

        totalPrice: 4,

        purchasing: false,

        purchasable:false,
        loading: false,
    }

    componentDidUpdate(){

      console.log("componenet did update")
      
    }

    componentDidMount(){
      console.log("printing props");
      console.log(this.props)

      console.log("componenet did mount")
    
      this.props.onInitIngredients();


    
  
     }

     postIngredientHandler=()=>{

       const postIngredientReq = {
        salad:2,
        bacon:0,
        cheese:0,
        meat:0

       }

       axios.post('/ingredients.json',postIngredientReq)
       .then(response=>{
         console.log(response);
       }).catch(error=>{
         console.log(error);
       });
     }

    render () {

        const disabledInfo={
            ...this.props.ings
        }

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }

        let burger = null
        let orderSummary=null;
       let checkout = null ;

        if(this.props.ings==null){
          burger = <Spinner /> 
          orderSummary = <Spinner /> 

        }else{
          burger = (
            <Aux>
            <Burger ingredients={this.props.ings} />
            <BuildControls isAuthenticated={this.props.isAuthenticated}
                //ingredientAdded = {this.addIngredientHandler} 
                ingredientAdded = {this.props.onIngredientAdded} 

                //ingredientRemoved={this.removeIngredientHandler} 
                ingredientRemoved={this.props.onIngredientRemoved} 

                disabled={disabledInfo} price={this.props.price}
                purchasable={this.updatePurchaseState(this.props.ings)}
                ordered = {this.purchaseHandler}
             />
             </Aux>
          );

          orderSummary = (
          
            <OrderSummary ingredients={this.props.ings}
               purchaseCancelled={this.purchaseCancelHandler} 
                purchaseContinued={this.purchaseContinueHandler} 
                price={this.props.price}
                >
            </OrderSummary>
         
          );

          checkout = (
            <Checkout ings={this.props.ings}/>
          );



          if(this.props.loading ){
            burger = <Spinner /> 
            orderSummary = <Spinner />
          }
        }

        let modal= <Modal show={this.state.purchasing}  modalClosed={this.purchaseCancelHandler}>
        {orderSummary}
          </Modal>;

        // if(!this.props.isAuthenticated&&this.state.purchasing){
        //   modal =  <Navigate to='/auth' />
        // }
         
        return (
         
            <Aux>
            {modal}
                {burger}
            {/* <Routes>    
                <Route  index exact element={burger} />
                <Route path="/checkout"  element={checkout} />
                <Route path="/contact-data"  element={<Aux>{checkout}<ContactData /></Aux>} />

                <Route path="/orders" element={<Orders/>} /> 
            </Routes> */}

            </Aux>
        );
    }


    addIngredientHandler=(type) =>{
        const oldCount=this.state.ingredients[type];
        const updatedCount=oldCount + 1;
        const updatedIngredients={
            ...this.state.ingredients
        }
        updatedIngredients[type]=updatedCount;
        const priceAddition=INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice:newPrice, ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler=(type) =>{
        const oldCount=this .state.ingredients[type];
        const updatedCount=oldCount - 1;
        const updatedIngredients={
            ...this.state.ingredients
        }
        updatedIngredients[type]=updatedCount;
        const priceAddition=INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;

        this.setState({totalPrice:newPrice, ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    }

    //.......................................


    // updatePurchaseState = (ingredients) => {
    //   console.log(ingredients);
    //     const sum = Object.keys(ingredients)
    //       .map(igKey => {
    //         return ingredients[igKey];
    //       })
    //       .reduce((sum, el) => {
    //         return sum + el;
    //       }, 0);
    //       return this.setState({ purchasable: (sum > 0)});
    //   }

    updatePurchaseState = (ingredients) => {
      console.log(ingredients);
        const sum = Object.keys(ingredients)
          .map(igKey => {
            return ingredients[igKey];
          })
          .reduce((sum, el) => {
            return sum + el;
          }, 0);
          return (sum > 0);
      }
    
      purchaseHandler = () => {
        // this.setState({
        //     purchasing: true
        //   });
        if(this.props.isAuthenticated){
          this.setState({
            purchasing: true
          });
        } else {
          const queryParams = [];
          for(let i in this.props.ings){
            queryParams.push(encodeURIComponent(i) + "="+ encodeURIComponent(this.props.ings[i]));
          }

          const queryString = queryParams.join('&');
  
          this.props.onSetAuthRedirectPath("/checkout?" + queryString);
          this.props.navigate("/auth");
          //this.props.history.push("/auth");
        }
      }
    
      purchaseCancelHandler = () => {
        this.setState({
          purchasing: false
        })
      }
    
      purchaseContinueHandler = () => {

        const queryParams = [];
        for(let i in this.props.ings){
          queryParams.push(encodeURIComponent(i) + "="+ encodeURIComponent(this.props.ings[i]));
        }

        const queryString = queryParams.join('&');

        this.props.navigate("/checkout/"+"?" + queryString,{ state: { id: 1, name: 'sabaoon' } });

        this.setState({loading:false})

         this.setState({purchasing:false})

         
      //  const postOrderRequest={
      //       ingredients : this.state.ingredients,
      //       price: this.state.price,
      //       customerName:{
      //         name:'David Oteng',
      //         address:{
      //           street: 'East Legon',
      //           zipcode: '233',
      //           country: 'Ghana'
      //       },
      //       email:'daveotengo@gmail.com',

      //       },
      //       deliverymethod:'fastest'
      //   }
      //   axios.post('/orders.json',postOrderRequest)
      //   .then(response=>{

      //     this.setState({loading:false,purchasing:false});

      //     console.log(response);
      //   }).catch(error=>{
      //     this.setState({loading:false,purchasing:false});

      //     console.log("printing error");
      //     console.log(error);
      //   });



        //alert("you can continue");
       // this.props.onInitPurchase();
        //this.props.history.push('/checkout');
      }  
}

//export default withErrorHandler(BurgerBuilder,axios);

function WithNavigate(props) {
  let navigate = useNavigate();
  const location = useLocation();

  //return <Blog {...props} navigate={navigate} location={location} />
  return <BurgerBuilder {...props} navigate={navigate} location={location} />
}

//export default  withErrorHandler(WithNavigate,axios);
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    building: state.burgerBuilder.building,
    isAuthenticated: state.auth.token !== null
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(WithNavigate, axios));
