
import React, { useEffect, useState } from 'react';
import Config from '../../../../config';
import AxiosInstance from '../../../../desing-system/Authentication/AxiosInstance';
import ApexChart_Location_country from '../ApexChart/ApexChart_Location_country';
import CountryButtonRegions from './CountryButtonRegions';
import './styles.css';

export default function CountryButton({ data }) {
  const [countryData, setCountryData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedCountry) {
          const response = await AxiosInstance.get(
            `${Config.baseURL}/dashboard/api/Country/?country=${selectedCountry}`
          );
          setCountryData(response.data);
        }
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchData();
  }, [selectedCountry]);


  const handleButtonClick = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div className="CountryBut">
      <div className="CountryBut_flex">
        {data &&
          data.country &&
          data.country.map((country, index) => (
            <div key={index}>
              <button
                className="Country_button"
                onClick={() => handleButtonClick(country)}
              >
                {country}
              </button>
            </div>
          ))}
        <div style={{ width: '100%', marginTop: '30px', float: 'left' }}>

          {countryData && countryData.region_counts && (

            <ApexChart_Location_country
              title={countryData?.country_name}
              data={countryData?.region_counts}
            />
          )}
        </div>

        <div style={{ width: '100%', marginTop: '30px', float: 'left' }}>
          {countryData && countryData?.regions_names && (
            <CountryButtonRegions regions={countryData.regions_names} />
          )}

        </div>
      </div>
    </div>
  );
}