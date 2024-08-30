
import React from 'react';
import './ReportProduct.css';

const ReportProduct = ({ report }) => {
    // Sort the report data by total_quantity in descending order
    const sortedReport = report
        ? [...report.order_item].sort((a, b) => b.total_quantity - a.total_quantity)
        : [];

    return (
        <div className='container_order_details'>
            <div className='details_head'>
                <div className='details_head_h4'>تقرير المنتجات</div>
            </div>
            <div className="customer-list">
                <table>
                    <thead>
                        <tr>
                            <th>اسم المنتج</th>
                            <th>الكمية</th>
                            <th>اجمالي التكلفة</th>
                            <th>الايرادات</th>
                            <th>عدد مرات الشراء</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedReport.map((item, index) => (
                            <tr key={index}>
                                <td>{item.dictionary__name}</td>
                                <td>{item.total_quantity}</td>
                                <td>{item.total_cost}</td>
                                <td>{item.total_amount}</td>
                                <td>{item.item_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportProduct;
