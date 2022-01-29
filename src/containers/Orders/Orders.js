import React from 'react';
import {connect} from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends React.Component {

  state = {
    orders :[],
    loading:false
  }
  componentDidMount(){
   // this.props.onFetchOrders(this.props.token, this.props.userId);
  console.log("loging token in orders")
   console.log(this.props.token);
   this.props.onFetchOrders(this.props.token);

  }

  // componentWillUpdate(){
  //   console.log("loging token in orders")
  //   console.log(this.props.token);
  //   this.props.onFetchOrders(this.props.token);
  // }
  render(){
    let orders = <Spinner />
    //if (!this.props.loading){
     if (!this.props.loading){
      orders =
        this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price} />
      ))
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
