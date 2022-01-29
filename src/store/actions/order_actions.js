import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFailure = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILURE,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
};

// export const purchaseBurger = (orderData, token) => {
//   return {
//     type: actionTypes.PURCHASE_BURGER,
//     orderData: orderData,
//     token: token
//   };
// };

export const purchaseBurger = (orderData,token) => {

  return dispatch => {
    dispatch(purchaseBurgerStart());

    axios.post('/orders.json?auth='+token,orderData)
    .then(response=>{

      //this.setState({loading:false,purchasing:false});
      console.log(response);

      dispatch(purchaseBurgerSuccess(response.data.name, response.data))

     // this.props.navigate('/orders');

    }).catch(error=>{
      //this.setState({loading:false,purchasing:false});
      dispatch(purchaseBurgerFailure(error))
      console.log("printing error");
      console.log(error);
    });

  }
  // return {
  //   type: actionTypes.PURCHASE_BURGER,
  //   orderData: orderData,
  //   //token: token
  // };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFailure = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILURE,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};


export const fetchOrders = (token) => {
  return dispatch => {

      dispatch(fetchOrdersStart());

      console.log("dispatching orders")

      const url ='/orders.json?auth='+token;

      console.log("logging url");

      console.log(url);
      
      axios.get(url).then(response=>{
        //this.setState({loading:false});
    
        console.log(response);
    
        const fetchOrders = [];
    
        for (let key in response.data){
    
          fetchOrders.push({
            ...response.data[key],
            id : key
          })
    
        }
    
        console.log("printing fetchorders")
    
        console.log(fetchOrders);
    
        dispatch(fetchOrdersSuccess(fetchOrders));
        //this.setState({orders:fetchOrders,loading:false});
        
      }).catch(error=>{
    
        //this.setState({loading:false});
        console.log("logging error from response")
        
        console.log(error)

    
        dispatch(fetchOrdersFailure(error));

    
      });

  }
  // return {
  //   type: actionTypes.FETCH_ORDERS,
  //   // token: token,
  //   // userId: userId
  // }
};

// export const fetchOrders = (token, userId) => {
//   return {
//     type: actionTypes.FETCH_ORDERS,
//     token: token,
//     userId: userId
//   }
// };
