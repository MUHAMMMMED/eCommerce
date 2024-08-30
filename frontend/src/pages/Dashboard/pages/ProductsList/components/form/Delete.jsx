import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import AxiosInstance from '../../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../../components/config';

export default function Delete({ item, fetchData }) {


  const handleDelete = async () => {
    // Display confirmation dialog before deleting
    if (window.confirm('Are you sure you want to delete this Product?')) {
      try {
        await AxiosInstance.delete(`${Config.baseURL}/api/products/product_list_update_delete/${item.id}/`);
        fetchData();
      } catch (error) {
        console.error('There was an error deleting the Product!', error);
      }
    }
  };

  return (
    <>
      <div style={{ float: 'left', width: '40px' }}>
        <span className='onLine-icon' onClick={handleDelete}><AiOutlineDelete /></span>
      </div>







    </>
  )
}
