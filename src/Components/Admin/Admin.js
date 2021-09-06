import { useState } from 'react';
import { Link } from 'react-router-dom';
import { password } from '../../password';
import './Admin.css';


const Admin = () => {
    const [getIn, setGetIn] = useState(false);

    const handleAuthentication = () => {
        const insertedPassword = document.getElementById("admin-key").value;
        if (insertedPassword === password) {
            setGetIn(true)
        }
        else {
            alert("The key you entered is not Correct")
        }
    }

    return (
        <div>
            {
                !getIn ?
                     <div className="internal-auth">
                         <h1>Admin Verification</h1>
                        <img src="https://i.ibb.co/g7RvFdn/106702-lockdown-corona-download-hd.png" alt="" />
                        <h2>Type the Special Key to prove that you are an Admin</h2>
                    
                        <input type="text" placeholder="Type The Special Key" id="admin-key" className="input-text" />

                        <input type="submit" className="submit" onClick={handleAuthentication} />
                    </div>
                :
                    <p></p>
            }
            <div className="sideBar-container">
                <Link className="side-menu" to="/admin/manageProducts"><i className="far fa-trash-alt"></i> Manage Product</Link>
                <Link className="side-menu" to="/admin/addProduct"><i className="far fa-plus-square"></i> Add Product</Link>
                <Link className="side-menu" to="/admin/editProduct"><i className="fas fa-edit"></i> Edit Product</Link>
            </div>
        </div>
    );
};

export default Admin;