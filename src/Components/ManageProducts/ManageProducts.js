import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoadingTxt from '../LoadingTxt/LoadingTxt';
import './ManageProducts.css';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toggle, setToggle] = useState(true);
    const history = useHistory();

    const handleDelete= id => {
        fetch(`https://nameless-meadow-14932.herokuapp.com/deleteProduct/${id}`,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(result => {
            alert("Deleted Successfully");
            setToggle(!toggle);
        })
    }

    useEffect(() => {
        fetch('https://nameless-meadow-14932.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
    }, [toggle]);
    return (
        <div className="manage-container">
                    <div className="table-head">
                        <p>Image</p>
                        <p>Name</p>
                        <p>Price</p>
                        <p>Delete</p>
                    </div>
                {
                    loading ? <LoadingTxt/> : 
                    products.map(product => 
                    <div className="pdData-container" key={product._id}>
                        <img src={product.imageURL} alt=""/>
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                        <button onClick={()=> handleDelete(product._id)}>
                            <i className="fas fa-trash-alt"></i> 
                        </button>
                    </div>
                    )
                }
        </div>
    );
};

export default ManageProducts;