import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../../components/config';

export default function Select({ order }) {

    const [currentStatus, setCurrentStatus] = useState(order.status);
    const [anticipation, setAnticipation] = useState(order.anticipation);
    const [package_type, setPackage_type] = useState(order.package);
    const [packageData, setPackageData] = useState([]);

    useEffect(() => {
        const handleStatusChange = async () => {
            try {
                await AxiosInstance.put(`${Config.baseURL}/api/orders/status/${order.id}/`, null, {
                    params: { status: currentStatus }
                });

            } catch (error) {
                console.error('Error updating status:', error);
            }
        };

        handleStatusChange();
    }, [currentStatus, order.id]);


    useEffect(() => {
        const handleanticipationChange = async () => {
            try {
                await AxiosInstance.put(`${Config.baseURL}/api/orders/anticipation/${order.id}/`, null, {
                    params: { anticipation: anticipation }
                });

            } catch (error) {
                console.error('Error updating anticipation:', error);
            }
        };

        handleanticipationChange();
    }, [anticipation, order.id]);

    useEffect(() => {
        const handlpackage_typeChange = async () => {
            try {
                await AxiosInstance.put(`${Config.baseURL}/api/orders/package/${order.id}/`, null, {
                    params: { package: package_type }
                });

            } catch (error) {
                console.error('Error updating package:', error);
            }
        };

        handlpackage_typeChange();
    }, [package_type, order.id]);


    useEffect(() => {
        fetchPackage();
    }, []);

    const fetchPackage = async () => {
        try {
            const response = await AxiosInstance.get(`${Config.baseURL}/api/accounting/package/`);
            setPackageData(response.data.package);
        } catch (error) {
            console.error("There was an error fetching the package data!", error);
        }
    };

    return (
        <div className='details_head'>

            <div className='details_select'>
                <div className='details_orders_select'>
                    <div className='details_orders_select_label'><label for="" >:حدد الحاله </label>  </div>
                    <div className='details_orders_select_option'>

                        <select id="status" value={currentStatus}
                            onChange={(e) => setCurrentStatus(e.target.value)}
                            style={{ width: '100%', textAlign: 'center' }} >
                            <option value="waiting">انتظار</option>
                            <option value="processing">تجهيز الطلب</option>
                            <option value="Shipping">تم الشحن</option>
                            <option value="done">تم</option>
                            <option value="cancel">الغاء</option>
                        </select>

                    </div></div></div>
            <div className='details_select'>

                <div className='details_orders_select'>
                    <div className='details_orders_select_label'><label for="" >:حدد وصول الشحن  </label>  </div>
                    <div className='details_orders_select_option'>
                        <select id="anticipation" value={anticipation}
                            onChange={(e) => setAnticipation(e.target.value)}
                            style={{ width: '100%', textAlign: 'center' }} >
                            <option value="sat">السبت</option>
                            <option value="sun">الأحد</option>
                            <option value="mon">الاثنين</option>
                            <option value="tue">الثلاثاء</option>
                            <option value="wed">الأربعاء</option>
                            <option value="thu">الخميس</option>
                            <option value="fri">الجمعة</option>
                        </select>
                    </div></div> </div>
            <div className='details_select'>
                <div className='details_orders_select'>
                    <div className='details_orders_select_label'><label for="" >:  حدد نوع التغليف  </label>  </div>
                    <div className='details_orders_select_option'>
                        <select id="anticipation"
                            value={package_type}
                            onChange={(e) => setPackage_type(e.target.value)}
                            style={{ width: '100%', textAlign: 'center' }} >
                            <option value=''> حدد التغليف</option>
                            {packageData.map(item => (
                                <option value={item?.id}>{item?.name}</option>))}
                        </select>
                    </div></div></div>

        </div>
    )
}



