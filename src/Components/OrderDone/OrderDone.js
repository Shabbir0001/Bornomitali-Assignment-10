import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './OrderDone.css';

const OrderDone = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="orderDone-container">
            <img src="https://i.ibb.co/p1HKDvP/3-2-wedding-png-hd.png" alt=""/>
            <h1>Thank You</h1>
            <h1>{loggedInUser.name}</h1>
            <h1>Your Order Has Been Placed</h1>
            <Link to="/" className="shop-more">Shop More</Link>
        </div>
    );
};

export default OrderDone;