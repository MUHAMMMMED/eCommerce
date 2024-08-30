import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../../../../../../components/Authentication/AxiosInstance';
import Config from '../../../../../../../../components/config';

export default function SelectStatus({ orderId, initialStatus, fetchOrders }) {
    const [currentStatus, setCurrentStatus] = useState(initialStatus);

    useEffect(() => {
        const handleStatusChange = async () => {
            try {
                await AxiosInstance.put(`${Config.baseURL}/api/orders/status/${orderId}/`, null, {
                    params: { status: currentStatus }
                });
                fetchOrders();
            } catch (error) {
                console.error('Error updating status:', error);
            }
        };

        handleStatusChange();
    }, [currentStatus, orderId]);

    return (
        <div className='orders_list_text' style={{ margin: '0', padding: '0' }}>
            <select
                id="status"
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}
                style={{ width: '100%', textAlign: 'center', margin: '0', padding: '2px' }}
            >
                <option value="waiting">انتظار</option>
                <option value="processing">تجهيز الطلب</option>
                <option value="Shipping">تم الشحن</option>
                <option value="done">تم</option>
                <option value="cancel">الغاء</option>
            </select>
        </div>
    );
}
