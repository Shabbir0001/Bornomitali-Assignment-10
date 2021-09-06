import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoadingTxt from '../LoadingTxt/LoadingTxt';
import Shop from '../Shop/Shop';
import './Home.css';


const Home = () => {
   
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('https://nameless-meadow-14932.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
    }, []);

    const handleCheckOut = (id) => {
        history.push(`/checkOut/${id}`);
    };
    return (
            <div>
                {
                    loading ?
                        <div className="spinner-container">
                            <LoadingTxt />
                        </div>
                        :
                        <div className="body-container">
                            {
                                products.map(product =>
                                    <Shop
                                        key={product._id}
                                        product={product}
                                        handleCheckOut={handleCheckOut}
                                    >
                                    </Shop>)
                            }
                        </div>
                }
            </div>
    );
};

export default Home;