import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../../../../components/Authentication/AxiosInstance';

import Config from '../../../../../../components/config';
import ApexChart_Location_country from '../ApexChart/ApexChart_Location_country';
import './styles.css';

export default function CountryButtonRegions({ regions }) {

  const [regionData, setRegionData] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedRegion) {
          const response = await AxiosInstance.get(
            `${Config.baseURL}/api/Report/region/?Region=${selectedRegion}`
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

        <div style={{ width: '100%', marginTop: '30px', float: 'left' }} >
          {regionData && regionData?.region_counts && <ApexChart_Location_country title={regionData?.region_name} data={regionData?.region_counts} />}
        </div> </div>  </div>

  )
}

