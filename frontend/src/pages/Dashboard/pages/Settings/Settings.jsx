import React, { useEffect } from 'react';
import { AiOutlineProduct } from "react-icons/ai";
import { BiPurchaseTagAlt, BiSolidOffer } from "react-icons/bi";
import { BsQuestionDiamond } from "react-icons/bs";
import { CiAlignTop, CiCreditCard2 } from "react-icons/ci";
import { FaBalanceScale, FaUserTie } from "react-icons/fa";
import { FaMountainCity } from "react-icons/fa6";
import { GiExpense } from "react-icons/gi";
import { GoCodeReview } from "react-icons/go";
import { HiOutlineRectangleGroup } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
import { LiaFileInvoiceSolid, LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineEditNote } from "react-icons/md";
import { PiPackage } from "react-icons/pi";
import { RiAdvertisementLine, RiCoupon3Line } from "react-icons/ri";
import { SlChart } from "react-icons/sl";
import { TbCategory2, TbInfoSquareRounded } from "react-icons/tb";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { Link, useNavigate } from 'react-router-dom';
import SettingsCart from './components/SettingsCart /SettingsCart';

export default function Settings() {
  const navigate = useNavigate();
  useEffect(() => {
    const userExists = localStorage.getItem('user');
    if (!userExists) {
      navigate('/login');
    }
  }, [navigate]); // Ensure navigate is added as a dependency for useEffect

  return (
    <div className='container_order_details'>
      <div className='details_head'>
        <Link to="/dashboard">
          <div className='details_head_ArrowBack'><IoIosArrowBack /></div>
        </Link>
      </div>
      
      <div className='details_head'>
        <div className='details_head_h4'> </div>
      </div>
      <SettingsCart name={' التقارير'} icon={<SlChart />} link={'/report'} />
      <SettingsCart name={'العملاء'} icon={<FaUserTie />} link={'/customer_list'} />
      <SettingsCart name={'الفواتير الالكترونية'} icon={<LiaFileInvoiceSolid />} link={'/invoice'} />
      <SettingsCart name={'المصاريف'} icon={<GiExpense />} link={'/expense'} />
      <SettingsCart name={'المشتريات'} icon={<BiPurchaseTagAlt />} link={'/purchase'} />
      <SettingsCart name={'التغليف'} icon={<PiPackage />} link={'/package'} />
      <SettingsCart name={'ميزانية الاعلانات'} icon={<RiAdvertisementLine />} link={'/ad_budget'} />
      <SettingsCart name={'رصيد شركة الشحن'} icon={<FaBalanceScale />} link={'/shipping_balance'} />
      <SettingsCart name={' كود الخصم'} icon={<RiCoupon3Line />} link={'/coupon'} />
      <SettingsCart name={'الدول المتاحه  '} icon={<FaMountainCity />} link={'/shipping_country'} />
      <SettingsCart name={' شركات الشحن'} icon={<LiaShippingFastSolid />} link={'/shipping_company'} />
      <SettingsCart name={'الفئات'} icon={<TbCategory2 />} link={'/Categories_list'} />
      <SettingsCart name={'المنتجات'} icon={<AiOutlineProduct />} link={'/Products_list'} />
      <SettingsCart name={' العروض'} icon={<BiSolidOffer />} link={'/deal'} />
      <SettingsCart name={'التقييم'} icon={<GoCodeReview />} link={'/rate'} />
      <SettingsCart name={'الأسئلة المتكررة'} icon={<BsQuestionDiamond />} link={'/questions'} />
      <SettingsCart name={'عرض الشرائح'} icon={<TfiLayoutSliderAlt />} link={'/slide'} />
      <SettingsCart name={' كرت '} icon={<CiCreditCard2 />} link={'/card'} />
      <SettingsCart name={'الاكثر مبيعا'} icon={<CiAlignTop />} link={'/best_sellers'} />
      <SettingsCart name={' مجموع منتجات '} icon={<HiOutlineRectangleGroup />} link={'/group'} />
      <SettingsCart name={' معلومات الموقع'} icon={<TbInfoSquareRounded />} link={'/info_settings'} />
      <SettingsCart name={'ملاحظات الطلبات'} icon={<MdOutlineEditNote />} link={'/note'} />
 
    </div>
  );
} 