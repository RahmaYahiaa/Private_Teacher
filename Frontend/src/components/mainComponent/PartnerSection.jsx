import React, { useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './PartnerSection.css';

const PartnerSection = () => {
  useEffect(() => {
    // OwlCarousel autoplay management using IntersectionObserver
    const handleSliderAutoplay = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelector('.owl-carousel').classList.add('autoplay');
        } else {
          document.querySelector('.owl-carousel').classList.remove('autoplay');
        }
      });
    };

    const observer = new IntersectionObserver(handleSliderAutoplay, {
      root: null,
      threshold: 0.1,
    });

    const target = document.querySelector('#partner_slider');
    if (target) {
      observer.observe(target);
    }
  }, []);

  const options = {
    loop: true,
    margin: 15,
    items: 4,
    autoplay: true,
    autoplayTimeout: 3000,
    smartSpeed: 2000,
    nav: false,
    dots: false,
    rtl: true,
    responsive: {
      0: { items: 2 },
      576: { items: 3 },
      768: { items: 4 },
      992: { items: 5 },
    },
  };

  return (
    <section className="partner">
      <div className="container-fluid">
        <OwlCarousel id="partner_slider" className="partner_slider owl-theme" {...options}>
          {[...Array(16)].map((_, index) => (
            <div className="item" key={index}>
              <img src="./images/salvi.png" alt="Partner" />
            </div>
          ))}
        </OwlCarousel>
      </div>
    </section>
  );
};

export default PartnerSection;
