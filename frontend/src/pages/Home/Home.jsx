import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import Accordion from '../../components/Accordion/Accordion';
// import BestCart from '../../components/Cart/BestCart';
// import Feedback from '../../components/Feedback/Feedback';
import Footer from '../../components/Footer/Footer';
import ErrorPage from '../../components/Loading/ErrorPage';
import Loading from '../../components/Loading/Loading';
import Config from '../../components/config';
import CardSlider from './components/CardSlider/CardSlider';
// import CategoryCard from './components/CategoryCard/CategoryCard';
// import Deal from './components/Deal/Deal';
// import Experts from './components/Experts/Experts';
import ImageSlider from './components/ImageSlider/ImageSlider';


export default function Home() {
  const [data, setData] = useState({
    info: {},
    slide: [],
    Category: [],
    one_deal: '',
    deal: [],
    group_product: [],
    card: [],
    best_sellers: [],
    questions: [],
    rate: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Config.baseURL}/api/home/list/`);
      setData(response.data);
    } catch (error) {
      setError(error.response?.data?.message || " الصفحة غير موجوده");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }


  return (
    <>
      {data && (<>
        <ImageSlider slide={data?.slide} />
        {/* <CategoryCard Category={data?.Category} /> */}
        {/* <Deal data={data} /> */}
        {/* <Experts group_product={data.group_product} name={'استعرض المنتج'} title={'تم اختياره من قبل خبرائنا'} /> */}
        <CardSlider card={data?.card} />
        {/* <BestCart Items={data?.best_sellers} title={'الاكثر مبيعا'} /> */}
        {/* <Accordion questions={data?.questions} /> */}
        {/* <Feedback rates={data?.rate} /> */}

      </>)}

      <Footer />

    </>

  )
}
