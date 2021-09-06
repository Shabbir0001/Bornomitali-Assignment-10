import React from 'react';
import './Shop.css';


const Shop = (props) => {
    const product = props.product;

    return (
            <div className="shop-container">
                <div className="card-container">
                    <div className="image-box">
                        <img src={product.imageURL} alt="" style={{ height: '300px' }} />
                        <h2>{product.name}</h2>
                    </div>
                    <div className="content-box">
                       
                        <h1>{product.price } TK</h1>
                        <button onClick={() => props.handleCheckOut(product._id, product.name)}><i className="fas fa-shopping-cart"></i> Buy Now</button>
                    </div>
                </div>
            </div>
    );
};

export default Shop;