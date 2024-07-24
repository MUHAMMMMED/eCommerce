import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import AxiosInstance from '../../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../../components/config';

export default function Delete({ itemId, fetchData }) {
    const handleDelete = async () => {
        if (window.confirm("هل أنت متأكد أنك تريد حذف هذه  الملاحظة ؟")) {
            try {
                await AxiosInstance.delete(`${Config.baseURL}/api/cart/note-delete/${itemId}/`);
                fetchData();
            } catch (error) {
                console.error('There was an error deleting the deal!', error);
            }
        }
    };
    return (
        <div style={{ float: 'left', width: '40px' }}>
            <span className='onLine-icon' onClick={handleDelete}><AiOutlineDelete /></span>
        </div>
    );
}
