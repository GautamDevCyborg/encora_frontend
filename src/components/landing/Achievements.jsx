import React from 'react';

import '../../assets/css/bootstrap.min.css'
import '../../assets/css/all.min.css'
import '../../assets/css/swiper-bundle.min.css'
import '../../assets/css/magnific-popup.css'
import '../../assets/css/animate.css'
import '../../assets/css/nice-select.css'
import '../../assets/css/style.css'

const Achievements = () => {
  return (
    <section className="achievement">
      <div className="container">
        <div className="row g-4 align-items-center justify-content-between">
          <div className="col-lg-5 achievement__bor-right wow fadeInUp" data-wow-duration="1.2s" data-wow-delay=".2s">
            <div className="achievement__item">
              <h2 className="text-white pt-3 pb-3 gradient-color">
                Our Trees have been Monitored
               
              </h2>
            </div>
          </div>
          <div className="col-lg-2 achievement__bor-right wow fadeInUp" data-wow-duration="1.4s" data-wow-delay=".4s">
            <div className="achievement__item text-center">
              <img src="/images/icon/achieve1.png" height="65px" alt="icon" />
              <h5>Total Number Of Trees planted Till Now</h5>
              <span className="count">6,472,068</span>
            </div>
          </div>
          <div className="col-lg-2 achievement__bor-right wow fadeInUp" data-wow-duration="1.6s" data-wow-delay=".6s">
            <div className="achievement__item text-center">
              <img src="/images/icon/achieve2.png" height="65px" alt="icon" />
              <h5>Verified Families & Users </h5>
              <span className="count">38,768</span>
            </div>
          </div>
          <div className="col-lg-2 wow fadeInUp" data-wow-duration="1.8s" data-wow-delay=".8s">
            <div className="achievement__item text-center">
              <img src="/images/icon/achieve3.png" height="65px" alt="icon" />
              <h5> Our Canopy Coverage</h5>
               <span className="count">Country : 15</span><br/>
               <span className="count">Cities : 183</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;