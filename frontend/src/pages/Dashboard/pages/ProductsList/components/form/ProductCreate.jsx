
import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';

import AxiosInstance from '../../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../../components/config';
import './ProductForm.css';

const ProductCreate = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userExists = localStorage.getItem('user');
    if (!userExists) {
      navigate('/login');
    }
  }, [navigate]); // Ensure navigate is added as a dependency for useEffect

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    description: '',
    theme_type: '',
    // theme_id: '',
    // theme_content_type: '',
    is_active: true,
    is_active_note: true,
    note_help_top: '',
    note_help: '',
    note_help_bottom: '',
    quantity1: 0,
    quantity2: 0,
    quantity3: 0,
    quantity4: 0,
    quantity5: 0,
    cost: 0,
    price1: 0,
    price2: 0,
    price3: 0,
    price4: 0,
    price5: 0,
    discount_price1: 0,
    discount_price2: 0,
    discount_price3: 0,
    discount_price4: 0,
    discount_price5: 0,
    currency: '',
    default_option: 0,
    category: '',
    image_side_one: null,
    image_side_two: null,
    top_slider_web: null,
    top_slider_mobile: null,
    stock_no: 0,
    stock_alarm: 0,
    video: '',
    expiration_date_offer: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    // Append all fields to the FormData object
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== '') {
        form.append(key, formData[key]);
      }
    }

    try {
      await AxiosInstance.post(`${Config.baseURL}/api/products/product_create/`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/Products_list');

    } catch (error) {
      console.error('There was an error creating the product!', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await AxiosInstance.get(`${Config.baseURL}/api/products/categories_list/`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error("There was an error fetching the categories data!", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
 
  return (
<>
    <div className='container_order_details'> 
    <div className='details_head'>
    <Link to="/Products_list"><div className='details_head_ArrowBack'><IoIosArrowBack /></div></Link>
    </div>   </div>


    <form className='FORM'>
   

   <h2 style={{width:'100%',textAlign:'center',color:'#000'}}>اضافه منتج جديد</h2>

      <div className='product-form-row1'>

      <div className='product-form'>
        <div className="form-group">
          <label className='form-group-label'>الاسم:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className='form-group-label'>العنوان الفرعي:</label>
          <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className='form-group-label'>الوصف:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>
      
        <div className="form_Group_check" >
          <label className='label_dash' htmlFor="is_active">اظهار المنتج علي الموقع</label>
          <label className="switch">
            <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
            <span className="slider"></span>
          </label>
        </div>

        <div className="form_Group_check">
          <label className='label_dash' htmlFor="is_active_note">اظهار طلب ملاحظات للمنتج</label>
          <label className="switch">
            <input type="checkbox" name="is_active_note" checked={formData.is_active_note} onChange={handleChange} />
            <span className="slider"></span>
          </label>
        </div>
 
      </div>
 
      <div className='product-form'>
        <div className="formGroup">
          <label className='form-group-label'>العملة:</label>
          <input type="text" name="currency" value={formData.currency} onChange={handleChange} required />
        </div>
        <div className="formGroup">
          <label className='form-group-label'>نوع الموضوع:</label>
          <select name="theme_type" value={formData.theme_type} onChange={handleChange}>
            <option value="">اختر الموضوع</option>
            <option value="themeone">شرائح</option>
              <option value="themetwo">الشائع</option>
          </select>
        </div>
        <div className="formGroup">
          <label className='form-group-label'>الفئة:</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">جميع الفئات</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>




      <div className='product-form'>


<div className="formGroup">
 <label className='form-group-label'> تكلفة المنتج</label>
    <input type="number" step="0.01" name="cost" value={formData.cost} onChange={handleChange} required />
  </div>


   <div className="formGroup">
    <label className='form-group-label' >   المخزون المتاح</label>
    <input type="number" name="stock_no" value={formData.stock_no} onChange={handleChange} required />
  </div>
 
   <div className="formGroup">
    <label className='form-group-label'> التنبيه كمية المنتج إلى حد  </label>
    <input type="number" name="stock_alarm" value={formData.stock_alarm} onChange={handleChange} required />
  </div>
   </div>



   <div className='product-form'>
     
        <div className="form-group">
          <label className='form-group-label'>مساعدة الملاحظة العلوية:</label>
          <input type="text" name="note_help_top" value={formData.note_help_top} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className='form-group-label'>مساعدة مكان كتابه الملاحظة:</label>
          <input type="text" name="note_help" value={formData.note_help} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className='form-group-label'>مساعدة الملاحظة السفلية:</label>
          <input type="text" name="note_help_bottom" value={formData.note_help_bottom} onChange={handleChange} />
        </div>
       
      </div>

      <div className='product-form'>
        <div className="form-group">
        <label className='form-group-label'> اضف فيديو  تعريفي للمنتج</label>
          <input type="text" name="video" value={formData.video} onChange={handleChange} />
        </div>
      </div>

      </div>
 
      <div className='product-form-row2'>

       <div className='product-form'>
        <div className="form_Group">
          <label className='form-group-label'>صورة وجه كرت المنتج الاولي</label>
          <input type="file" name="image_side_one" onChange={handleChange} />
          <div className='top_slider_div'></div>
        </div>
        <div className="form_Group">
          <label className='form-group-label'>صورة وجه كرت المنتج الثانيه</label>
          <input type="file" name="image_side_two" onChange={handleChange} />
          <div className='top_slider_div'></div>
        </div>
      </div>

      <div className='product-form'>
        <div className="form_Group">
          <label className='form-group-label'>صورة شريط علوي ويب للمنتج</label>
          <input type="file" name="top_slider_web" onChange={handleChange} />
          <div className='top_slider_div'></div>
        </div>
        <div className="form_Group">
          <label className='form-group-label'>صورة شريط علوي موبايل للمنتج</label>
          <input type="file" name="top_slider_mobile" onChange={handleChange} />
          <div className='top_slider_div'></div>
        </div>
      </div>
      

       <div className='product-form'>

       <div className="formGroup">
         <label className='form-group-label'>السعر 1</label>
        <input type="number" step="0.01" name="price1" value={formData.price1} onChange={handleChange} />
       </div>


        <div className="formGroup">
          <label className='form-group-label'>الكمية 1</label>
        <input type="number" name="quantity1" value={formData.quantity1} onChange={handleChange} />
       </div>

       <div className="formGroup">
          <label className='form-group-label'>سعر الخصم 1</label>
         <input type="number" step="0.01" name="discount_price1" value={formData.discount_price1} onChange={handleChange} />
        </div>


       <div className="formGroup">
         <label className='form-group-label'>السعر 2</label>
          <input type="number" step="0.01" name="price2" value={formData.price2} onChange={handleChange} />
        </div>


      
        <div className="formGroup">
          <label className='form-group-label'>الكمية 2</label>
         <input type="number" name="quantity2" value={formData.quantity2} onChange={handleChange} />
       </div>

        <div className="formGroup">
         <label className='form-group-label'>سعر الخصم 2</label>
         <input type="number" step="0.01" name="discount_price2" value={formData.discount_price2} onChange={handleChange} />
        </div>


        <div className="formGroup">
         <label className='form-group-label'>السعر 3</label>
         <input type="number" step="0.01" name="price3" value={formData.price3} onChange={handleChange} />
       </div>
      
   
       <div className="formGroup">
          <label className='form-group-label'>الكمية 3</label>
          <input type="number" name="quantity3" value={formData.quantity3} onChange={handleChange} />
       </div>


        <div className="formGroup">
          <label className='form-group-label'>سعر الخصم 3</label>
          <input type="number" step="0.01" name="discount_price3" value={formData.discount_price3} onChange={handleChange} />
       </div>


        <div className="formGroup">
         <label className='form-group-label'>السعر 4</label>
          <input type="number" step="0.01" name="price4" value={formData.price4} onChange={handleChange} />
        </div>
      
    


       <div className="formGroup">
         <label className='form-group-label'>الكمية 4</label>
          <input type="number" name="quantity4" value={formData.quantity4} onChange={handleChange} />
        </div>

       <div className="formGroup">
         <label className='form-group-label'>سعر الخصم 4</label>
          <input type="number" step="0.01" name="discount_price4" value={formData.discount_price4} onChange={handleChange} />
       </div>

        <div className="formGroup">
         <label className='form-group-label'>السعر 5</label>
         <input type="number" step="0.01" name="price5" value={formData.price5} onChange={handleChange} />
       </div>


       <div className="formGroup">
         <label className='form-group-label'>الكمية 5</label>
         <input type="number" name="quantity5" value={formData.quantity5} onChange={handleChange} />
       </div>


       <div className="formGroup">
          <label className='form-group-label'>سعر الخصم 5</label>
         <input type="number" step="0.01" name="discount_price5" value={formData.discount_price5} onChange={handleChange} />
          </div>
         
        <div className="form_Group">
         <label  className='form-group-label'>  كميه المحدد داخل صفحه المنتج    </label>
         <input type="number"   name="default_option" value={formData.default_option} onChange={handleChange} />
       </div>


       <div className="form_Group">
          <label className='form-group-label'>حدد تاريخ انتهاء التخفيض</label>
          <input type="date" name="expiration_date_offer" value={formData.expiration_date_offer} onChange={handleChange} />
        </div>


      </div></div>
 
      <div className='product-form'>
        <button className='form-group_button '  onClick={handleSubmit}>إنشاء المنتج</button>
      </div>
    </form></>
  );
};

export default ProductCreate;
