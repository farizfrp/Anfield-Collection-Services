import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './pages/Login';
import Signup from './pages/Signup';
import loginSuccess from './pages/loginSuccess';
import MainPage from './pages/MainPage/MainPage';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';
import CartPage from './pages/CartPage/CartPage';
import DetailPage from './pages/DetailPage/DetailPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AddProduct from './pages/AddProduct/AddProduct';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import SearchPage from './pages/SearchPage/SearchPage';
import OrderPage from './pages/OrderPage/OrderPage';
import OrderListPage from './pages/OrderListPage/OrderListPage';
import OrderDetailPage from './pages/OrderDetailPage/OrderDetailPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CartPageTest from './pages/CartPage/CartPageTest';
import ListProduct from './pages/ListProduct/ListProduct';
import filterPricePage from './pages/filterPricePage/filterPricePage';
import NavigatePage from './pages/NavigatePage/NavigatePage';
export default class Routes extends Component {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
			      <Scene key="Login" component={Login} title="Login" />
			      <Scene key="signup" component={Signup} title="Register" />
				  <Scene key="MainPage" component={MainPage} title="MainPage"  initial={true}/>
				  <Scene key="loginSuccess" component={loginSuccess} title="loginSuccess"/>
				  <Scene key="CategoriesPage" component={CategoriesPage} title="CategoriesPage"/>
				  <Scene key="CartPage" component={CartPage} title="CartPage"/>
				  <Scene key="DetailPage" component={DetailPage} title="DetailPage"/>
				  <Scene key="RegisterPage" component={RegisterPage} title="RegisterPage"/>
				  <Scene key="AddProduct" component={AddProduct} title="AddProduct" />
				  <Scene key="ForgotPasswordPage" component={ForgotPasswordPage} title="ForgotPasswordPage"/>
				  <Scene key="SearchPage" component={SearchPage} title="SearchPage"  />
				  <Scene key="OrderPage" component={OrderPage} title="OrderPage"  />
				  <Scene key="OrderListPage" component={OrderListPage} title="OrderListPage"  />
				  <Scene key="OrderDetailPage" component={OrderDetailPage} title="OrderDetailPage"  />
				  <Scene key="ProfilePage" component={ProfilePage} title="ProfilePage"  />
				  <Scene key="CartPageTest" component={CartPageTest} title="CartPageTest"    />
				  <Scene key="ListProduct" component={ListProduct} title="ListProduct"    />
				  <Scene key="filterPricePage" component={filterPricePage} title="filterPricePage"   />
				  <Scene key="NavigatePage" component={NavigatePage} title="NavigatePage"   />
			    </Stack>


			 </Router>
			)
	}
}

