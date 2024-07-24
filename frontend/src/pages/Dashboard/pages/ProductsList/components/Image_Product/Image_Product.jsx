import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../../components/config';
import Image_ProductCreate from './Image_ProductCreate';

export default function Image_Product({ProductId}) {
const [imageProducts, setImageProducts] = useState([]);
 
    useEffect(() => {fetchImageProducts(); }, []);
 
    const fetchImageProducts = async () => {
      try {
        const response = await AxiosInstance.get(`${Config.baseURL}/api/products/image_products/${ProductId}/`);
        setImageProducts(response.data);
      } catch (error) {
        console.error('Error fetching image products:', error);
      }
    };
   
  
    const handleDeleteImageProduct = async (id) => {
      try {
        await AxiosInstance.delete(`${Config.baseURL}/api/products/image_product/${id}/`);
        fetchImageProducts(); 
      } catch (error) {
        console.error('Error deleting image product:', error);
      }
    };
  
      

  return (
    <>
 
<Image_ProductCreate ProductId={ProductId} fetchImageProducts={fetchImageProducts}/>
 
<div className='product-form'>
{imageProducts.map((item) => (
<div className="formGroup"key={item.id}>
<label className='form-group-label' onClick={() => handleDeleteImageProduct(item.id)}>
 <span className='x-img'>X</span></label>
<img class="mage_side_img" src={`${Config.baseURL}${item?.image}`}  alt='image' />
 </div>
 ))}</div>
</>
  )
}
