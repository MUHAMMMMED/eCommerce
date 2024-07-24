import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../../components/config';
 

export default function CreateDeal({ fetchData }) {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setproduct] = useState([]);
  const [formData, setFormData] = useState({
    title:'',
    product:'',
 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post(`${Config.baseURL}/api/home/deals/`, formData);
      setShowModalCreate(false);
      fetchData();
      setFormData({
        title:'',
        product:product,
 
      });
    } catch (error) {
      console.error("Error creating Country:", error);
    }
  };

 

  const handleCloseModal = () => {
    setShowModalCreate(false);
  };
  

  useEffect(() => {
      fetchProducts();
  }, []);

  const fetchProducts = async () => {
      try {
          const response = await AxiosInstance.get(`${Config.baseURL}/api/products/product_list_dash/`);
          setProducts(response.data.products);
       } catch (error) {
          console.error("There was an error fetching the product data!", error);
      }
  };
 
  const handleproductChange = (event) => {
    setproduct(event.target.value);
};
 
  return (
    <>
      <button onClick={() => setShowModalCreate(true)} className="Creat_button">اضافه</button>
      <div className={`modal_dash ${showModalCreate ? 'show_dash' : ''}`}>
        <form className="modal-content_dash animate" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='form_title'>انشاء جديد</div>
          <div className="FOrm-container_dash">
            <div className="form-container-half">
              <label className='label_dash' htmlFor="title" style={{ paddingTop: '15px' }}>  العنوان  </label>
              <input type="text" className='text_dash' name="title" value={formData.title} onChange={handleChange} placeholder="  عنوان العرض  " />
            </div>
  <div className="form-container-half" style={{marginTop:'10px'}}>
 <label htmlFor="product-select"style={{ paddingTop: '15px',textAlign:'center',float:'right',marginBottom:'5px' }} >اختر المنتج</label>
 <select id="product-select" onChange={handleproductChange}>
 <option value="" >  المنتجات</option>                              
 {products.map((item) => (<option key={item.id} value={item.id}>{item.name}</option>))}
 </select>  </div>   </div>
  <br /><br />
          <div className="FOrm-container_dash" style={{ paddingTop: '20px' }}>
            <div style={{ width: '78%' }}><button className="button-form" type="submit">حفظ</button></div>
            <div style={{ width: '20%' }}><button className="cancel-button" onClick={handleCloseModal}>الغاء</button></div>
          </div>
        </form>
      </div>
    </>
  );
}
