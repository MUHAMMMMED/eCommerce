import React, { useState, useEffect } from 'react';
import Config from '../../../../config';
import AxiosInstance from '../../../../desing-system/Authentication/AxiosInstance';
import './styles.css';
import ApexChart_Location_country from '../ApexChart/ApexChart_Location_country';

 export default function CountryButtonRegions({regions }) {
 
  const [regionData, setRegionData] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

 useEffect(() => {
  const fetchData = async () => {
    try {
      if (selectedRegion) {
        const response = await AxiosInstance.get(
          `${Config.baseURL}/dashboard/api/Region/?Region=${selectedRegion}`
        );
        setRegionData(response.data);
      }
    } catch (error) {
      console.error('Error fetching Region data:', error);
    }
  };

  fetchData();
}, [selectedRegion]);

 const handleButtonClick = (Region) => {
  setSelectedRegion(Region);
};

  return (
 <div className='CountryBut'> 
 <div className='CountryBut_flex'>
{regions.map(item => (  
    <div><button key={item.id} className='Country_button'
    onClick={() => handleButtonClick(item)}
 >  {item}</button></div>
))}

<div style={{width:'100%', marginTop:'30px', float:'left'}} > 
{regionData && regionData?.region_counts&& <ApexChart_Location_country title={regionData?.region_name} data={regionData?.region_counts} />}
  </div> </div>  </div>
  
)
}
 
 