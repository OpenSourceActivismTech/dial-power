import axios from 'axios';
<<<<<<< HEAD
import { CLEAR_AUTH, SET_AUTH_JWT_FULFILLED } from '../reducers/login';
=======
>>>>>>> cd5417dae698b1228e186e278d0fcded7734b6f0

export function loginUser(loginInfo, history) {
  const { email, password } = loginInfo;

  return dispatch => axios.post('/authenticate', {
    email,
    password
  })
  .then(res => {
<<<<<<< HEAD
    const { token, id } = res.data;
    localStorage.setItem('auth_token', token);
    dispatch(setUserAuthCredentials({id: id}))
=======
    console.log('response from attempt to login user: ', res);
>>>>>>> cd5417dae698b1228e186e278d0fcded7734b6f0
    history.push('/');
  })
  .catch(err => {
    console.log('error in posting user login: ', err);
  })
}
<<<<<<< HEAD

export function logoutUser(userInfo, history) {
  return dispatch => axios.get('/logout')
  .then(() => {
    window.localStorage.removeItem('auth_token');
    history.push('/login');
  })
  .catch(err => {
    console.log('error with user logout: ', err);
  })
}

export function userValidation(cb){
  return dispatch => axios.get('/session',
  {
    headers: {'Authoization': 'JWT' + localStorage.getItem('auth_token')}
  })
  .then(res => {
    const { id } = res.data;
    return dispatch(setUserAuthCredentials({id: id}));
  })
  .then(() => {
    cb();
  })
  .catch(err => {
    console.log('error with user validation: ', err);
    cb();
  });
}

export function setUserAuthCredentials(user) {
  return {
    type: SET_AUTH_JWT_FULFILLED,
    payload: user
  }
}

export function clearAuthCredentials(){
  return {
    type: CLEAR_AUTH
  }
}

export function authTransition(storeInstance) {
  const { auth } = storeInstance.getState();
  console.log(auth, 'should be the auth obj from the store');
  const { id } = auth;
  const token = localStorage.getItem('auth_token');
  console.log(!!id, 'id', !!token, 'token')
  return !!id && !!token;
}
=======
>>>>>>> cd5417dae698b1228e186e278d0fcded7734b6f0
