import './App.css';
import axios from 'axios';
import { RouterProvider } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { jwtDecode } from "jwt-decode";
import CustomRoutes from './routes/index.jsx';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logInStatus } from './store/reducers/logIn.js';
import { setUserInfo } from './store/reducers/userInfo.js';
import { setStoreCart } from './store/reducers/cart.js';
import { setAppLoadingStatus, setStoreMobileViewStatus } from './store/reducers/appStatus.js';
// import { useNavigate } from 'react-router';


function App() {
  const dispatch = useDispatch();
  const [cookies] = useCookies();
  // const navigate = useNavigate();
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('sm'));

  axios.defaults.headers.get['token'] = `Bearer ${cookies?.accessToken}`;
  axios.defaults.headers.post['token'] = `Bearer ${cookies?.accessToken}`;
  axios.defaults.headers.put['token'] = `Bearer ${cookies?.accessToken}`;
  axios.defaults.headers.delete['token'] = `Bearer ${cookies?.accessToken}`;

  useEffect(() => {
    dispatch(setStoreMobileViewStatus({ status: mobileView }));
  }, [mobileView])

  useEffect(() => {
    checkLoginAndAuth();
  }, [cookies, cookies?.accessToken])


  const getCartData = async(id) => {
    try {
      const cartData = await axios.post('/userCart/getCartdata', {
      id: id
    })
      dispatch(setStoreCart({ cartId: cartData.data._id, cartArr: cartData.data.books }));
    } catch (error) {
      
    }
  }

  const checkLoginAndAuth = () => {
    const accessToken = cookies?.accessToken;
    const refreshToken = cookies?.refreshToken;
    if (accessToken) {
      let currentDate = new Date();
      const decodedToken = jwtDecode(accessToken)
      if (decodedToken.exp * 1000 > currentDate.getTime()) {
        console.log(decodedToken)
        dispatch(setUserInfo(
          {
            accessToken: accessToken,
            refreshToken: refreshToken,
            userName: decodedToken.userName,
            userId: decodedToken.id,
            userRole: decodedToken.role
          }
        ));
        dispatch(logInStatus({ status: true }));
        getCartData(decodedToken.cartId._id)
      } else {
        dispatch(setUserInfo(
          {
            accessToken: null,
            refreshToken: null,
            userName: null,
            userId: null,
            userRole: null
          }
        ));
        dispatch(logInStatus({ status: false }));
        dispatch(setStoreCart({ cartId: null, cartArr: null }));
      }
    } else {
      // navigate('/auth/login')
    }
    dispatch(setAppLoadingStatus({ status: false }));
  }
  return (
    <RouterProvider router={CustomRoutes} />
  )
}

export default App
