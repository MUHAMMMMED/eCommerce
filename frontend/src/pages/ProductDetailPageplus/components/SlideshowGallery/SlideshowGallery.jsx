 
import React, { useState, useEffect } from 'react';
import './SlideshowGallery.css'; // Assuming you have CSS file

const SlideshowGallery = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const [images, setImages] = useState([]);

  // Fetch image data on component mount
  useEffect(() => {
    const fetchImages = async () => {
      const imageData = [
    


        { src: 'https://thereviewguys.com.au/cdn/shop/files/TRG-Product-1_9bea83ec-c317-4ce5-a72d-c7668ba81536.png', alt: 'Image 1' },
        { src: 'https://thereviewguys.com.au/cdn/shop/files/TRG-Product-3_3cf77a8f-9514-4526-9208-d58f89882968.png', alt: 'Image 2' },
        { src: 'https://thereviewguys.com.au/cdn/shop/files/TRG-Product-5_fee2381f-210c-4dea-aa55-e1e563e2200e.png', alt: 'Image 3' },
        { src: 'https://thereviewguys.com.au/cdn/shop/files/TRG-Product-10_3e29540e-11b3-4ba3-8d82-849fc1cb1c1a.png', alt: 'Image 4' },






        // ... add other image objects
      ];
      setImages(imageData);
    };

    fetchImages();
  }, []);

  const plusSlides = (n) => {
    setSlideIndex((prevSlideIndex) => (prevSlideIndex + n + images.length) % images.length); // Wrap around logic
  };

  const currentSlide = (n) => {
    setSlideIndex(n);
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Slideshow Gallery</h2>
      <div className="container">
      <img
          className="mySlides"
          src={images[slideIndex ]?.src} // Check for image existence
          alt={images[slideIndex]?.alt} // Check for alt text
          style={{ width: '100%' }}
        />







        {/* Display current slide image */}
        <img
          className="mySlides"
          src={images[slideIndex - 1]?.src} // Check for image existence
          alt={images[slideIndex - 1]?.alt} // Check for alt text
          style={{ width: '100%' }}
        />

        {/* Thumbnail images */}
        <div className="row">
          {images.map((image, index) => (
            <img
              key={index} // Add unique keys
              className="demo cursor"
              src={image.src}
              alt={image.alt} // Ensure alt text
              style={{ width: '25%' }}
              onClick={() => currentSlide(index + 1)} // Adjust index
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <a className="prev" onClick={() => plusSlides(-1)}>❮</a>
        <a className="next" onClick={() => plusSlides(1)}>❯</a>

        {/* Caption container (optional) */}
        <div className="caption-container">
          <p id="caption">{images[slideIndex - 1]?.alt}</p>
        </div>
      </div>
    </div>
  );
};

export default SlideshowGallery;
// import React, {useEffect} from "react";
// import { SlideshowLightbox, initLightboxJS } from "lightbox.js-react";
// import "lightbox.js-react/dist/index.css";
// import { SlideshowGallery } from './components/SlideshowGallery/SlideshowGallery';

// export function SlideshowGallery() {
//   useEffect(() => {
//     initLightboxJS("Insert License key", "Insert plan type here");
//   });

//   return (
//     <SlideshowLightbox
//       theme="day"
//       showThumbnails={true}
//       className="images"
//       roundedImages={true}
//     >
//       <img
//         alt="Mechanical keyboard with white keycaps."
//         src={"https://source.unsplash.com/sQZ_A17cufs/549x711"}
//       />
//       <img
//         alt="Mechanical keyboard with white, pastel green and red keycaps."
//         src={"https://source.unsplash.com/rsAeSMzOX9Y/768x512"}
//       />
//       <img
//         alt="Mechanical keyboard with white, pastel pink, yellow and red keycaps."
//         src={"https://source.unsplash.com/Z6SXt1v5tP8/768x512"}
//       />
//       <img
//         alt="Mechanical keyboard with white keycaps."
//         src={"https://source.unsplash.com/2WcghjtPodU/549x711"}
//       />
//     </SlideshowLightbox>
//   );
// }