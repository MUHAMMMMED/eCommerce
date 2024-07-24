import axios from 'axios';
import React, { useState } from 'react';
import { BiHome } from "react-icons/bi";
import { GrNotes } from "react-icons/gr";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { PiPackage } from "react-icons/pi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../components/Loading/Loading';
import Config from '../../components/config';
import './OrderTracking.css';

export default function OrderTracking() {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false); 

    const fetchOrder = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${Config.baseURL}/api/orders/tracking/?tracking=${trackingNumber}`);
            if (response.data && response.data.id) {
                setOrder(response.data);
            } else {
                toast.error('رقم تتبع شحنتك غير صحيح');
                setOrder(null);
            }
        } catch (err) {
            toast.error('حدث خطأ أثناء محاولة استرجاع معلومات الطلب. يرجى المحاولة مرة أخرى.');
            setOrder(null);
        }
        setLoading(false);
        setSearched(true); // Set searched to true after fetching
    };

    if (loading) {
        return <Loading />;
      }
      


    const handleInputChange = (e) => {
        setTrackingNumber(e.target.value);
    };

    const handleSearchClick = () => {
        fetchOrder();
    };

    const renderOrderStatus = () => {
        if (!order || !order.status) return null;

        const statusSteps = {
            waiting: [
                { icon: <GrNotes />, text: "تمت معالجتها", style: "Check" },
                { icon: <PiPackage />, text: "تم الشحن", style: 'icon_spen' },
                { icon: <LiaShippingFastSolid />, text: "في الطريق اليك", style: 'icon_spen' },
                { icon: <BiHome />, text: "وصل", style: 'icon_spen' }
            ],
            processing: [
                { icon: <GrNotes />, text: "تمت معالجتها", style: "Check" },
                { icon: <PiPackage />, text: "تم الشحن", style: 'icon_spen' },
                { icon: <LiaShippingFastSolid />, text: "في الطريق اليك", style: 'icon_spen' },
                { icon: <BiHome />, text: "وصل", style: 'icon_spen' }
            ],
            Shipping: [
                { icon: <GrNotes />, text: "تمت معالجتها", style: 'Check' },
                { icon: <PiPackage />, text: "تم الشحن", style: 'Check' },
                { icon: <LiaShippingFastSolid />, text: "في الطريق اليك", style: 'Check' },
                { icon: <BiHome />, text: "وصل", style: "icon_spen" }
            ],
            done: [
                { icon: <GrNotes />, text: "تمت معالجتها", style: 'Check' },
                { icon: <PiPackage />, text: "تم الشحن", style: 'Check' },
                { icon: <LiaShippingFastSolid />, text: "في الطريق اليك", style: 'Check' },
                { icon: <BiHome />, text: "وصل", style: 'Check' }
            ],
            cancel: [
                { icon: <MdOutlineCancelPresentation />, text: "تم الغاء الطلب", style: 'Check' }
            ]
        };

        const steps = statusSteps[order.status];
        if (!steps) return null;



        return steps.map((step, index) => (
            <div className="rowTracking" key={index}>
                <div className='card_icon'>
                    <div className={step.style}>{step.icon}</div>
                </div>
                <div className='card_cou_text'>
                    <p className="font-weight-bold">{step.text}</p>
                </div>
            </div>
        ));
    };

    const renderAnticipationDay = (day) => {
        const daysInArabic = {
            sat: 'السبت',
            sun: 'الأحد',
            mon: 'الاثنين',
            tue: 'الثلاثاء',
            wed: 'الأربعاء',
            thu: 'الخميس',
            fri: 'الجمعة'
        };
        return daysInArabic[day] || '';
    };



    
    return (
        <div className="container_Tracking">
            <section className="Tracking_CONtainer">
                <h3 className='Tracking_h1'> تتبع شحنتك </h3><br />
                <input
                    type="text"
                    className='Tracking_input'
                    name="trackingNumber"
                    placeholder="رقم الطلب "
                    value={trackingNumber}
                    onChange={handleInputChange}
                />
                <div className="form-group" style={{ margin: 'auto' }}>
                    <button className='Tracking_button' type="button" onClick={handleSearchClick}>بحث </button>
                </div>
                {searched && (!order || !order.id) && (
                <p style={{ color: 'red', textAlign: 'center' }}>رقم الطلب غير صحيح أو لا يوجد معلومات لهذا الطلب</p>
                )}
            </section>

            {order && order.id &&
                <div className="Tracking_info">
                    <div className='Tracking_info_h5'>
                        <div className='Tracking_info_center'>
                        {order.anticipation && (  <>
                        <div className='Tracking_info_spen-R'> : الطلب رقم  </div>
                        <div className='Tracking_info_spen-L'>{order.id}</div>
                        </>)} <br />
                        {order.anticipation && ( <>
                        <div className='Tracking_info_spen-R'> : الوصول المتوقع   </div>
                        <div className='Tracking_info_spen-L'>{renderAnticipationDay(order.anticipation)}</div>
                       </>  )}
              </div></div> </div>
            }

            {renderOrderStatus()}
            <ToastContainer />
        </div>
    );
}
