import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
  };
};

export const authFailure = (error) => {
  return {
    type: actionTypes.AUTH_FAILURE,
    error: error
  };
};
export const logout = () => {
  localStorage.setItem('token',null);
  localStorage.setItem('expirationDate',null);

  return dispatch=>{
    dispatch(logoutSucceed());
  }
  // return {
  //   type: actionTypes.AUTH_INITIATE_LOGOUT,
  // }
};

export const logoutSucceed = () => {
 return {
   type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  // return {
  //   type: actionTypes.AUTH_CHECK_TIMEOUT,
  //   expirationTime: expirationTime
  // }; 
  const expTime = expirationTime*1000;
  console.log("printing expTime")
  console.log(expTime);

  return dispatch => {
    setTimeout(()=>{
      dispatch(logout())
    },expTime)
  }
};

export const auth = (email, password, isSignUp) => {

  return dispatch => {

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBrdCSdMnrFeCeXAjSJr4KeOWbGSAR6Ct4';

    if(!isSignUp){

       url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBrdCSdMnrFeCeXAjSJr4KeOWbGSAR6Ct4';

    }

    console.log("printing url")
    console.log(url);


    const authData = {

      email: email,
      password: password,
      returnSecureToken: isSignUp

    }

    // {kind: "identitytoolkit#SignupNewUserResponse",…}
    // email: "daveotengo@yahoo.com"
    // expiresIn: "3600"
    // idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ3OTg5ZTU4ZWU1ODM4OTgzZDhhNDQwNWRlOTVkYTllZTZmNWVlYjgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVhY3QtbXktYnVyZ2VyLTlmNmU3IiwiYXVkIjoicmVhY3QtbXktYnVyZ2VyLTlmNmU3IiwiYXV0aF90aW1lIjoxNjM4Nzg1OTM4LCJ1c2VyX2lkIjoiczJmc1Z6ZldrYVVvNGl3MXpKUWg1T202djZUMiIsInN1YiI6InMyZnNWemZXa2FVbzRpdzF6SlFoNU9tNnY2VDIiLCJpYXQiOjE2Mzg3ODU5MzgsImV4cCI6MTYzODc4OTUzOCwiZW1haWwiOiJkYXZlb3RlbmdvQHlhaG9vLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJkYXZlb3RlbmdvQHlhaG9vLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.RtzS4pHWGlcmoO8mVOOEVEv3XZJkkZWRqrgMFm-hO3ixs1oj7vlJ6wnElrkfMnx3h5K7nK5F9G7LCuYWX4Lh5J4f8B7SX39iY4qCDqD1z8OmNuYMtdNgqeyIjJZTGWMpib4bFuaYpezgkyH7apSEWZS6vqPlUEjrYJl8xgr15O5R5mzdaMsUnK8xb_R2-ZJRpn1xY_gfKDE-1nPBsf3j4D0u2obaImw3L-Fjy862N8XPNrzgwoU6vFY2b9mXJVo4J7WOx4VrEDKOlB9Y3scl-Crj4u4AMtquzkQ4Wn_iCebT6dBtpK9x6LR2XsPHCA1Jpkm2LHOAiLIuSCcg_SIIqA"
    // kind: "identitytoolkit#SignupNewUserResponse"
    // localId: "s2fsVzfWkaUo4iw1zJQh5Om6v6T2"
    // refreshToken: "AFxQ4_pD62PG6irLBpc7iK5-f5kWd6_E1EM5pEwSNJ1zE7gQt19mZ9sSiHQ97u5K9wys_yNjVk_x4EBhfrFU1HcZ4MNmho62LH35GSak-bxD24eXrq2kExx_weog4QOo_smKb14c-RIjXadDXzlQ8TiFMMcOZECPLVqA0TDta8iUPMmjpJZqMi81rLtmfvUop25iwiDJ7yRGauHXE3TvSwfC5y1aoj7qsPgkZJ0mCDtfdgdWnJJzRIo"
    dispatch(authStart());

    axios.post(url,authData).
    then(response => {

        console.log(response);

        // const expirationDate = new Date(new Date.getTime() + response.data.expiresIn * 1000) 
        //        localStorage.setItem('expirationDate',expirationDate)

        localStorage.setItem('token',response.data.idToken)
        localStorage.setItem('userId',response.data.email)


        dispatch(authSuccess(response.data.idToken,response.data.email));
        if(!isSignUp){
          //dispatch(checkAuthTimeout(response.data.expiresIn));
        }


    }).catch(error=>{

      console.log("printing error");
      console.log(error)

      dispatch(authFailure(error.response.data.error));

      console.log("printing error.message");
      console.log(error.message);
      console.log("printing error.code");
      console.log(error.code);



      if (error.response) {
        // Request made and server responded
        console.log("printing resp.data");
        console.log(error.response.data);

        console.log("printing resp.data.error.message");
        console.log(error.response.data.error.message);

        console.log("printing resp.status");
        console.log(error.response.status);
        console.log("printing resp.headers");
        console.log(error.response.headers);

      } else if (error.request) {
        // The request was made but no response was received
        console.log("printing printing request");
        console.log(error.request);

      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("printing error.message");
        console.log('Error', error.message);
      }
    })
  }
  // return {
  //   type: actionTypes.AUTH_USER,
  //   email: email,
  //   password: password,
  //   isSignUp: isSignUp
  // }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => {
  return dispatch => {
  const token =  localStorage.getItem('token');
  console.log("logging token in authcheck")
  console.log(token);
  console.log("token state")
  console.log(token!=="null");

  if(token!=="null"){

    console.log("not dispatching logout authcheckstate")
    //const expirationDate =  localStorage.getItem('expirationDate');
    // if( expirationDate <= new Date()){
    //   dispatch(logout());

    // }else{
      const userId = localStorage.getItem('userId');

      dispatch(authSuccess(token,userId));

    //dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()))/1000);


    //}

  

  }else{
    console.log(token)
    console.log("dispatching logout authcheckstate")

    dispatch(logout());
  
  }
  }

  
  // return {
  //   type: actionTypes.AUTH_CHECK_STATE
  // }
};
