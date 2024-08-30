import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../../components/config';

export default function AddCompany({ itemId, fetchCountry }) {
    const [companyData, setCompanyData] = useState([]);
    const [formData, setFormData] = useState({
        CompanyId: ''
    });

    useEffect(() => {
        fetchCompany();
    }, []);

    const fetchCompany = async () => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/orders/shipping_company_list/`);
            setCompanyData(response.data.company);
        } catch (error) {
            console.error("There was an error fetching the company data!", error);
        }
    };

    const handleCompanyChange = (e) => {
        setFormData({
            ...formData,
            CompanyId: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AxiosInstance.post(`${Config.baseURL}/api/orders/shipping_country/${itemId}/company/`, formData);
            fetchCountry();
            setFormData({
                CompanyId: ''
            });
        } catch (error) {
            console.error("Error creating Country:", error);
        }
    };

    return (
        <div className="product-filter" style={{ width: '100%', float: 'right', marginTop: '20px' }}>
            <div style={{ width: '70%', float: 'right' }}>
                <label htmlFor="category-select">شركات الشحن</label>
                <select id="category-select" onChange={handleCompanyChange} value={formData.CompanyId}>
                    <option value="">شركات الشحن</option>
                    {companyData.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>
            <div style={{ width: '30%', float: 'right', padding: '0' }}>
                <button style={{ width: '70%', float: 'right', padding: '6px', background: '#9081f6' }} onClick={handleSubmit}>اضف</button>
            </div>
        </div>
    );
}
