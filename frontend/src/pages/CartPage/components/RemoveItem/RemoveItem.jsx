import axios from 'axios'; // Import axios
import React from 'react';
import { SlTrash } from "react-icons/sl";
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '../../../../components/Provider/CartProvider/CartProvider';
import Config from '../../../../components/config';

axios.defaults.withCredentials = true; // Ensuring cookies are sent with requests

export default function RemoveItem({ itemId, FetchCart }) {
    const { fetchCart } = useCart();

    const handleRemoveItem = async () => {
        try {
            const response = await axios.delete(`${Config.baseURL}/api/cart/delete-cart-item/${itemId}/`);
            if (response.status === 200) {
                // Item successfully removed, fetch updated cart data
                fetchCart();
                FetchCart();
                // Display success toast
                toast.success("تمت إزالة العنصر بنجاح");
            } else {
                // Handle errors, maybe show a notification to the user
                console.error('Failed to delete item from cart');
            }
        } catch (error) {
            console.error('Error deleting item from cart:', error);
        }
    };

    return (
        <>
            <div className='cartProductRemove' onClick={handleRemoveItem}>
                <SlTrash />
            </div>
            <ToastContainer />
        </>
    );
}
