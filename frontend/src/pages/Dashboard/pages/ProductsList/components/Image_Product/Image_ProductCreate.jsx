
import React, { useState } from 'react';
import AxiosInstance from '../../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../../components/config';
 
const Image_ProductCreate = ({ ProductId, fetchImageProducts }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please select an image file.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await AxiosInstance.post(`${Config.baseURL}/api/products/image_products/${ProductId}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchImageProducts();
      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <>
        <div className="form-group_image"  >
        <div className="form-group_image_center"  >
          <label className='form-group-label' style={{width:'100%',textAlign:'center'}}>اضف صور المنتج لعرض الشرائح</label>
          <input type="file" name="image" onChange={handleFileChange} />
        </div>
        <div className="form-group_but"  >
          <button className='form-group_button' style={{ marginTop: '40px' }}  onClick={handleSubmit}>إضافة صور المنتج</button>
          </div> </div>
        </>
 
  );
};

export default Image_ProductCreate;
