
import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate, useParams } from 'react-router-dom';
import AxiosInstance from '../../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../../components/config';
import Freq_Asked from '../Freq_Asked/Freq_Asked';
import Image_Product from '../Image_Product/Image_Product';
import MoreInfo from '../MoreInfo/MoreInfo';
import './ProductForm.css';

const ProductUpdate = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userExists = localStorage.getItem('user');
    if (!userExists) {
      navigate('/login');
    }
  }, [navigate]); // Ensure navigate is added as a dependency for useEffect

  const { id: ProductId } = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, []);
  
  // Update formData when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        subtitle: product.subtitle || '',
        description: product.description || '',
        theme_type: product.theme_type || '',
        theme_content_type: product.theme_content_type || '',
        is_active: product.is_active || false,
        is_active_note: product.is_active_note || false,
        note_help_top: product.note_help_top || '',
        note_help: product.note_help || '',
        note_help_bottom: product.note_help_bottom || '',
        quantity1: product.quantity1 || 0,
        quantity2: product.quantity2 || 0,
        quantity3: product.quantity3 || 0,
        quantity4: product.quantity4 || 0,
        quantity5: product.quantity5 || 0,
        cost: product.cost || 0,
        price1: product.price1 || 0,
        price2: product.price2 || 0,
        price3: product.price3 || 0,
        price4: product.price4 || 0,
        price5: product.price5 || 0,
        discount_price1: product.discount_price1 || 0,
        discount_price2: product.discount_price2 || 0,
        discount_price3: product.discount_price3 || 0,
        discount_price4: product.discount_price4 || 0,
        discount_price5: product.discount_price5 || 0,
        currency: product.currency || '',
        default_option: product.default_option || 0,
        category: product.category?.id || '', // Use optional chaining
        image_side_one: product.image_side_one || '',
        image_side_two: product.image_side_two || '',
        top_slider_web: product.top_slider_web || '',
        top_slider_mobile: product.top_slider_mobile || '',
        stock_no: product.stock_no || 0,
        stock_alarm: product.stock_alarm || 0,
        video: product.video || '',
        expiration_date_offer: product.expiration_date_offer || '',
        discount:product.discount || 0, 

      });
    }
  }, [product]);
   


  // Fetch categories from the server
  const fetchCategories = async () => {
    try {
      const response = await AxiosInstance.get(`${Config.baseURL}/api/products/categories_list/`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error('There was an error fetching categories data!', error);
    }
  };
 
  // Fetch the product details for editing
  const fetchProduct = async () => {
    try {
      if (!ProductId) return;
      const response = await AxiosInstance.get(`${Config.baseURL}/api/products/product_list_update_delete/${ProductId}/`);
      const responseData = response.data;

      setProduct(responseData);

      // Populate form data with product details
      setFormData({
        ...responseData,
        category: responseData.category.id, // Assuming responseData.category contains { id, name }
      });
    } catch (error) {
      console.error('There was an error fetching the product!', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (name === 'category') {
      setFormData({ ...formData, [name]: parseInt(value) }); // Ensure value is parsed to integer
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    
    // Loop through formData and append to form only if value is not null or empty
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== '') {
        // Handle file fields separately to ensure correct encoding type
        if (key === 'image_side_one' || key === 'image_side_two' || key === 'top_slider_web' || key === 'top_slider_mobile') {
          if (formData[key] instanceof File) {
            form.append(key, formData[key]);
          }
        } else {
          form.append(key, formData[key]);
        }
      }
    }
    try {
      await AxiosInstance.put(`${Config.baseURL}/api/products/product_list_update_delete/${ProductId}/`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/Products_list');
    } catch (error) {
      console.error('There was an error updating the product!', error);
    }
  };

  return (
 <>
  <div className='container_order_details'> 
    <div className='details_head'>
    <Link to="/Products_list"><div className='details_head_ArrowBack'><IoIosArrowBack /></div></Link>
    </div>   </div>
            


   <div className='FORM' >
      <h2 style={{width:'100%',textAlign:'center',color:'#000'}}>تعديل بيانات المنتج</h2>
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
              <option value="">اختر صفحة المنتج</option>
              <option value="themeone">شرائح</option>
              <option value="themetwo">الشائع</option>
            </select>
          </div>
         
          <div className="formGroup">
            <label className='form-group-label'>الفئة:</label>
            <select name="category" value={formData.category} onChange={handleChange}>
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

           {product?.image_side_one  ? (
          <img class="mage_side_img"  src={`${Config.baseURL}${product.image_side_one}`}/>
          ) : (  <div className='top_slider_div'></div>  )}
   
        </div>
        <div className="form_Group">
          <label className='form-group-label'>صورة وجه كرت المنتج الثانيه</label>
          <input type="file" name="image_side_two" onChange={handleChange} />
          {product?.image_side_two  ? (
          <img class="mage_side_img"  src={`${Config.baseURL}${product.image_side_two}`}/>
          ) : (  <div className='top_slider_div'></div>  )}
   
        </div>
      </div>

      <div className='product-form'>
        <div className="form_Group">
          <label className='form-group-label'>صورة شريط علوي ويب للمنتج</label>
          <input type="file" name="top_slider_web" onChange={handleChange} />
          {product?.top_slider_web  ? (
          <img class="mage_side_img"  src={`${Config.baseURL}${product.top_slider_web}`}/>
          ) : (  <div className='top_slider_div'></div>  )}
        </div>
        <div className="form_Group">
          <label className='form-group-label'>صورة شريط علوي موبايل للمنتج</label>
          <input type="file" name="top_slider_mobile" onChange={handleChange} />
          {product?.top_slider_web  ? (
          <img class="mage_side_img"  src={`${Config.baseURL}${product.top_slider_web}`}/>
          ) : (  <div className='top_slider_div'></div>  )}
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
         <label  className='form-group-label'>      الخصم العام    </label>
         <input type="number"   name="discount" value={formData.discount} onChange={handleChange} />
       </div>




 
       <div className="form_Group">
          <label className='form-group-label'>حدد تاريخ انتهاء التخفيض</label>
          <input type="date" name="expiration_date_offer" value={formData.expiration_date_offer} onChange={handleChange} />
        </div>
        
      
        <div className="form_Group">
        <label  className='form-group-label'>  كميه المحدد داخل صفحه المنتج    </label>
         <input type="number"   name="default_option" value={formData.default_option} onChange={handleChange} />
       </div>  
        
          </div>  </div>
 
{ProductId&&
<Image_Product ProductId={ProductId}/>}
{product?.freq&&<Freq_Asked freq={product?.freq} ProductId={ProductId} fetchProduct={fetchProduct}/>}

{product?.more_info&& <MoreInfo more_info={product?.more_info}ProductId={ProductId}  fetchProduct={fetchProduct}/>}

<div className='product-form'> <button className='form-group_button ' onClick={handleSubmit}> حفظ</button> </div>
 </div></>
  );
};

export default ProductUpdate;
