import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import './AddProduct.css';



const AddProduct = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const history = useHistory();



    const onSubmit = data => {
        const productData = {
            name: data.productName,
            price: data.productPrice,
            imageURL: imageURL
        };
        console.log(productData);
        const url = `https://nameless-meadow-14932.herokuapp.com/addProduct`;
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productData)
            })
                .then(res => console.log("server site response", res))
                
        history.push('/');

    };
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

    return (
        <div className="form-container">
            <h1>Add Your New Product Here</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input  {...register("productName", { required: true })} placeholder="Product Name" className="input-text" />
                {errors.exampleRequired && <span>This field is required</span>}
                <br />

                <input {...register("productPrice", { required: true })} placeholder="Product price" className="input-text" />
                {errors.exampleRequired && <span>This field is required</span>}
                <br />

                <input type="file" onChange={handleImageUpload} className="input-file" />
                {errors.exampleRequired && <span>This field is required</span>}
                <br />

                <input type="submit" className="submit" />
            </form>
        </div>
    );
};

export default AddProduct;