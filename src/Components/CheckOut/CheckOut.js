import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import LoadingTxt from '../LoadingTxt/LoadingTxt';
import './CheckOut.css';

const CheckOut = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { id } = useParams();
    const history = useHistory();
    const [product, setProduct] = useState([]);
    const { name, price, imageURL } = product;
    const [loading, setLoading] =useState(true);
    const [quantity, setQuantity] = useState(1);
    if (quantity < 1){
        setQuantity(1);
    };
    
    useEffect(() => {
        fetch('https://nameless-meadow-14932.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                const checkOutProduct = data.find(pd => pd._id === id);
                setProduct(checkOutProduct);
                setLoading(false);
            })
    }, [id])


    const handleCounter = (counter) => {
        if(counter){
            setQuantity(quantity + 1);
        }
        else{
            setQuantity(quantity -1);
        }
    
    }
     const total = (price * quantity + 50 - 0 ).toString();


    const processOrder = (product, count, total) => {
        product.total = total;
        const orderdProduct = {product, count};
        const orderDetails = {...loggedInUser, orderdProduct, orderTime: new Date().toDateString()  };

        fetch('https://nameless-meadow-14932.herokuapp.com/addOrder',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(orderDetails)
        })
        .then(res =>res.json())
        .then(data =>{
            alert("A Big Thumbs Up...!!!Your Order Has Been Placed.")
        })
        history.push('/orderDone')
    }
    return (
     
         loading ? <div className="loading-text"><LoadingTxt/></div> : 
         <div className="checkOut-container">
            
         <div className="product-container">
             <img src={imageURL} alt="" />
             <h3>{name}</h3>
         </div>

         <div className="process-order">
             <h3>Select Quantity</h3>
             <div className="select-quantity">
                 <i className="fas fa-minus-circle" onClick={()=> handleCounter(false)}></i>
                 <p>{quantity}</p>
                 <i className="fas fa-plus-circle" onClick={()=> handleCounter(true)}></i>
             </div>
             <h3>Price: {price} tk</h3>
             <h3>Discount: -0%</h3>
             <h3>Shipping: 50 tk</h3>
             <h3>Total: <span>{total}</span> tk</h3>
             <button onClick={()=>processOrder(product, quantity, total)} className="process-order-btn">Process Order</button>
         </div>

     </div>
     
    );
};

export default CheckOut;