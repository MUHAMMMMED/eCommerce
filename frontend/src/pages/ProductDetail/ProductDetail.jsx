
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import ErrorPage from '../../components/Loading/ErrorPage';
import Loading from '../../components/Loading/Loading';
import Config from '../../components/config';
import ProductDetailPage from '../ProductDetailPage/ProductDetailPage';
import ProductDetailPageplus from '../ProductDetailPageplus/ProductDetailPageplus';

export default function ProductDetail() {
    const { id: ProductId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  

    const fetchProduct = async () => {
        try {
            if (!ProductId) return;  
            const response = await axios.get(`${Config.baseURL}/api/products/products/${ProductId}/`);
            setProduct(response.data);
        } catch (error) { 
            setError(error.response?.data?.message || " الصفحة غير موجوده");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [ProductId]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorPage head="Error Occurred" error={error} />;
    }

    return (
        <>
 

        <br/> <br/> <br/> <br/> <br/> <br/>

        {product&&
<>
            {product.theme_type === 'themeone' && <ProductDetailPage product={product} />}
            {product.theme_type === 'themetwo' && <ProductDetailPageplus product={product}  />}
            {product.theme_type === 'themethree' && <h1>ThemeThree</h1>}
             </>
}


<Footer/>

        </>
    );
}
