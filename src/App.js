import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router, Link, Route, Switch
} from "react-router-dom";
import './App.css';
import NotFound from './Components/404/NotFound';
import AddProduct from './Components/AddProduct/AddProduct';
import Admin from './Components/Admin/Admin';
import AdminIntro from './Components/AdminIntro/AdminIntro';
import CheckOut from './Components/CheckOut/CheckOut';
import EditProduct from './Components/EditProduct/EditProduct';
import Home from './Components/Home/Home';
import LogIn from './Components/LogIn/LogIn';
import ManageProducts from './Components/ManageProducts/ManageProducts';
import OrderDone from './Components/OrderDone/OrderDone';
import Orders from './Components/Orders/Orders';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    isSignedIn: false,
    goIn: false,
    name: "",
    email: "",
    password: "",
    photoURL: "",
    error: ""
  });
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
      <div className="header-container">
        <div className="logo-container">
          <img src="https://i.ibb.co/T45Wt8m/bornomitali-logo.jpg" alt="" />
          <Link to="/" className="logo-txt"> বর্ণমিতালী</Link>
        </div>
        <div className="navbar-container">
          <Link to="/" className="nav-item">Home</Link>

          {
          loggedInUser.isSignedIn ?
          <Link to={`/orders/${loggedInUser.email}`} className="nav-item">Your Orders</Link> : <p/>
          }

          <Link to="/admin" className="nav-item">Admin</Link>

          <Link to="/deals" className="nav-item">Deals</Link>

        {
          loggedInUser.isSignedIn ? 
          <Link to="/userProfile" className="nav-item-user">{loggedInUser.name}</Link> :
          <Link to="/logIn" className="nav-item-login">Login</Link>
        }
        </div>
      </div>

      <hr />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/logIn">
          <LogIn/>
        </Route>

        <Route path="/admin/addProduct">
          <Admin/>
          <AddProduct />
        </Route>

        <Route path="/admin/manageProducts">
          <Admin/>
         <ManageProducts/>
        </Route>

        <Route path="/admin/editProduct">
        <Admin />
        <EditProduct/>
        </Route>

        <PrivateRoute path="/admin">
            <Admin />
            <AdminIntro/>
          </PrivateRoute>

        <PrivateRoute path="/checkOut/:id">
          <CheckOut/>
        </PrivateRoute>

        <PrivateRoute path="/orders/:userEmail">
          <Orders/>
        </PrivateRoute>

        <Route path="/orderDone">
          <OrderDone/>
        </Route>


        <Route path="*" >
          <NotFound />
        </Route>
        
      </Switch>
    
    </Router>
    </UserContext.Provider>
  );
}

export default App;
