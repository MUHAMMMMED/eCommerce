
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Footer from '../../components/Footer/Footer';
import ErrorPage from '../../components/Loading/ErrorPage';
import Loading from '../../components/Loading/Loading';
import Config from '../../components/config';
import Experts from '../Home/components/Experts/Experts';

export default function Categories() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Config.baseURL}/api/home/group-list/`);
      setData(response.data.group_products);
    } catch (error) {
      setError(error.response?.data?.message || " الصفحة غير موجوده");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tags = [
    { name: 'الرئيسية', link: '/' },
    { name: 'الفئات', link: '#' },
  ];


  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }


  return (
    <>
      <Breadcrumb tags={tags} />

      <div>
        {data && (<>

          <Experts group_product={data} name={'استعرض المنتجات'} title={''} />

        </>)}
      </div>
      <Footer />

    </>
  )
}

