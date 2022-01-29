import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  }
}

export const initIngredients = () => {
  // return {
  //   type: actionTypes.INIT_INGREDIENTS
  // }
return dispatch =>{
    //this.setState({loading:true});
    //dispatch()

    axios.get('/ingredients.json').then(response=>{
      //this.setState({loading:false});


      console.log("printing respone ingredients")
      console.log(response.data);

      dispatch(setIngredients(response.data));
      //this.setState({ingredients:response.data});
      
    }).catch(error=>{
      //this.setState({loading:false});
      dispatch(fetchIngredientsFailed());

      console.log(error)

    });
}

}
