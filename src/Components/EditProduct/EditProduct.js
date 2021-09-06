import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingTxt from '../LoadingTxt/LoadingTxt';
import './EditProduct.css';

const EditProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageURL, setImageURL] = useState(null);
    const [toggle, setToggle] = useState(true);
    const [showBox, setShowBox] = useState(false);
    const [toEdit, setToEdit] = useState({});



    useEffect(() => {
        fetch('https://nameless-meadow-14932.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
    }, [toggle]);


    const handleImageUpload = event => {
        const imageData = new FormData();
        imageData.set('key', '47d2237997fe0eb9b8b3ae42fe2a7091');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(response => {
                setImageURL(response?.data?.data?.display_url)
            })
            .catch(error => {
                console.log(error);
            });
    };


    const handleEditProduct = id => {
        const name = document.getElementById("update-name").value;
        const price = document.getElementById("update-price").value;
        const updateData = { name, price, imageURL }
        fetch(`https://nameless-meadow-14932.herokuapp.com/editProduct/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateData)
        })
            .then(res => res.json())
            .then(result => {
                alert("updated Successfully");
                setToggle(!toggle)
            })
    }

    const handleEditPopup = (id) => {
        const findToEdit = products.find(product => product._id === id);
        setToEdit(findToEdit);
        setShowBox(true);
    }

 

    const handleEditSubmission = id =>{
        handleEditProduct(id);
        setShowBox(false);
    }




    return (
        <div className="manage-container">
            {
                showBox ? <div className="edit-box">
                <p className="close-btn" onClick={()=> setShowBox(false)}><i className="fas fa-times-circle"></i></p>
                <h3>Update Product</h3>
                <div className="editable-data">
                <img src={toEdit.imageURL} alt="" />
                <h4>{toEdit.name}</h4>
                <h4>{toEdit.price} TK</h4>
                </div>

                <input type="text" placeholder="New Product Name" id="update-name" className="input-text" />

                <input type="text" placeholder="New Product Price" id="update-price" className="input-text" />

                <input type="file" onChange={handleImageUpload} className="input-file" />

                <input type="submit" className="submit" onClick={()=>handleEditSubmission(toEdit._id)}/>

            </div>
            :
            <p></p>
            }
            <div className="table-head">
                <p>Image</p>
                <p>Name</p>
                <p>Price</p>
                <p>Edit</p>
            </div>

            {
                loading ? <LoadingTxt /> :
                    <div>
                        {
                            products.map(product =>
                                <div className="pdData-container" key={product._id}>
                                    <img src={product.imageURL} alt="" />
                                    <p>{product.name}</p>
                                    <p>{product.price}</p>
                                    <button onClick={() => handleEditPopup(product._id)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                </div>
                            )
                        }

                    </div>
            }
        </div>
    );
};

export default EditProduct;

