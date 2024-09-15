
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaSnapchat, FaTiktok, FaTwitter } from 'react-icons/fa'; // Replace this with the correct TikTok icon
import FloatButton from '../FloatButton/FloatButton';
import Config from '../config';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [info, setInfo] = useState(null);


  useEffect(() => {
    axios.get(`${Config.baseURL}/api/home/info-list/`)
      .then(response => {
        setInfo(response.data);
      })

  }, []);


  return (
    <footer className="footer">
      <div className="contaIner">
        <div className="footer-content">

          <div className="footer-section social">
            <div className="social-icons">
              {info?.facebook && <a href={info.facebook}><FaFacebook /></a>}
              {info?.Twitter && <a href={info.Twitter}><FaTwitter /></a>}
              {info?.instagram && <a href={info.instagram}><FaInstagram /></a>}
              {info?.snapchat && <a href={info.snapchat}><FaSnapchat /></a>}
              {info?.TikTok && <a href={info.TikTok}><FaTiktok /></a>}

            </div>
          </div>

        </div>
      </div>

      <div className="copywright-section">
        <div className="container">
          <p className='ft_email'>  {info?.email}   :للتواصل عبر البريد الإلكتروني  </p>
        </div>
      </div>
      <div className="copywright-section">
        <div className="container">
          <p>      الحقوق محفوظة &copy;  {currentYear} {info?.title} </p>
        </div>
      </div>


      {/* <!-- Google Tag Manager --> */}
      <script>
        {(function (w, d, s, l, i) {
          w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
          var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', info?.pixel_id)}
      </script>
      {/* * <!-- End Google Tag Manager -->    */}



      <FloatButton info={info} />
    </footer>
  );
};

export default Footer;