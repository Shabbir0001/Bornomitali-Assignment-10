import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Orders.css';



const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { userEmail } = useParams();

    useEffect(() => {
        fetch(`https://nameless-meadow-14932.herokuapp.com/orders/${userEmail}`)
            .then(res => res.json())
            .then(data => {
                setOrders(data);
            })
    }, [userEmail])



    return (
        <div className="orders-container">
            <h2>You have {orders.length} Orders</h2>
            {
                orders.map(order =>
                    <div className="single-order-container" key={order._id}>
                        <img src={order.orderdProduct.product.imageURL} alt="" />
                        <div className="order-data">
                            <h3>Product Name: {order.orderdProduct.product.name}
                            </h3>
                            <p>Price: {order.orderdProduct.product.price} TK</p>
                            <p>Quantity: {order.orderdProduct.count}</p>
                            <h3>Total: {order.orderdProduct.product.total} TK</h3>
                        </div>
                        <div className="user-data">
                            <h3>Ordered By: {order.name}</h3>
                            <p>Address: {order.email}</p>
                            <p>Order Date: {order.orderTime}</p>
                            <p>Order Id: {order._id}</p>

                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Orders;