import React from 'react'

import '../../assets/css/bootstrap.min.css'
import '../../assets/css/all.min.css'
import '../../assets/css/swiper-bundle.min.css'
import '../../assets/css/magnific-popup.css'
import '../../assets/css/animate.css'
import '../../assets/css/nice-select.css'
import '../../assets/css/style.css'

const Services = () => {
  
  return (
    <div> 
    <section className="page-service sub-bg pt-20">
    <div className="container">


    <div className="section-header mb-5">                            
                        <h2 className="wow fadeInUp" data-wow-duration="1.4s" data-wow-delay=".4s">How It Works ?</h2>
                        <p className="wow fadeInUp " data-wow-duration="1.6s" data-wow-delay=".6s">
                          Below are 3 easy step to participate in this movement</p>
                    </div>



    <div className="row g-4 pb-20">
        <div
          className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 wow fadeInDown"
          data-wow-duration="1.2s"
          data-wow-delay=".2s"
        >
          <div className="work__item">
            <div className="work__item-icon">
              <img src="/images/icon/work1.svg" alt="icon" />
              <span className="gradient-number">01</span>
            </div>
            <h3><a href="/login" className="text-white">Login To Your Account</a></h3>
            {/* <p className="text-white">
              Eco sustenance is at the heart of ENCORAA's mission. This service is designed to ensure the harmonious coexistence of human activities...
            </p> 
            <a className="work__item-arrow text-white" href="tree-planting.html"
              ><i className="fa-solid fa-arrow-right"></i
            ></a> */}
            <div className="work__item-leaf">
              <img src="/images/shape/work-leaf.png" alt="work-leaf" />
            </div>
          </div>
        </div>
        <div
          className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 wow fadeInDown"
          data-wow-duration="1.4s"
          data-wow-delay=".4s"
        >
          <div className="work__item">
            <div className="work__item-icon">
              <img src="/images/icon/work2.svg" alt="icon" />
              <span>02</span>
            </div>
            <h3><a href="/upload" className="text-white">Capture your tree photo</a></h3>
            {/* <p className="text-white">
              ENCORAA's consulting services are designed to help businesses navigate the complex landscape of environmental sustainability. 
            </p>
            <a className="work__item-arrow text-white" href="consulting.html"
              ><i className="fa-solid fa-arrow-right"></i
            ></a> */}
            <div className="work__item-leaf">
              <img src="/images/shape/work-leaf.png" alt="work-leaf" />
            </div>
          </div>
        </div>
        <div
          className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 wow fadeInDown"
          data-wow-duration="1.6s"
          data-wow-delay=".6s"
        >
          <div className="work__item">
            <div className="work__item-icon">
              <img src="/images/icon/work3.svg" alt="icon" />
              <span>03</span>
            </div>
            <h3><a href="/trees" className="text-white">Submit & Share Your Photo</a></h3>
            {/* <p className="text-white">
              ENCORAA believes in empowering businesses with the knowledge and skills required to champion environmental sustainability.

            </p>
            <a className="work__item-arrow text-white" href="training.html"
              ><i className="fa-solid fa-arrow-right"></i
            ></a> */}
            <div className="work__item-leaf">
              <img src="/images/shape/work-leaf.png" alt="work-leaf" />
            </div>
          </div>
        </div>
      </div>




        <div className="row g-4 align-items-center">
            <div className="col-xl-8">
                <div className="page-service__right-item">
                    
                    <div className="row g-4">
                        <div className="col-sm-12 wow fadeInLeft" data-wow-duration="1.3s" data-wow-delay=".3s">
                            <ul>
                                <li><i className="fa-solid  me-2 primary-color fa-gear"></i>Participants can capture only photos of a newly planted tree, or sapling.</li>
                                <li><i className="fa-solid me-2 primary-color fa-gear"></i>Long lasting varieties of trees are preferred and they must be planted in Mother Earth, not in pots.</li>
                             
                                <li><i className="fa-solid  me-2 primary-color fa-gear"></i>Selfies or photos with human faces will not be verified.</li>
                                <li><i className="fa-solid  me-2 primary-color fa-gear"></i>Participants are required to give geolocation and camera permission to take the photos. </li>
                            
                                <li><i className="fa-solid me-2 primary-color fa-gear"></i>Your location and camera will be used only when you take photos of the plant.</li>
                                <li><i className="fa-solid me-2 primary-color fa-gear"></i>Your photos will be verified after uploading. Any improper visuals will be removed.</li>
                             
                                <li><i className="fa-solid   me-2 primary-color fa-gear"></i>Any kind of spamming will lead to the disabling of your account.</li>
                                 
                            </ul>
                        </div>
                         
                    </div>
                    <div className="section-header mb-5">                                                      
                      <p className="wow fadeInUp " data-wow-duration="1.6s" data-wow-delay=".6s">
                      Kindly provide clear picture and geo location detail of plant images for higher accuracy.Watch the tutorial video for more information.
                      <br/> <a
                href="/upload"
                className="btn-one wow fadeInUp"
                data-wow-duration="1.5s"
                data-wow-delay=".5s"
              >
                <span>Register your Tree</span>
                <i className="fa-solid fa-angles-right"></i>
              </a>
                      </p>
                  </div>
                  
           
             
                </div>
            </div>
            <div className="col-xl-4">
                <div className="image position-relative">
                     
                     
                         
                            <div className="container-youtube">
                                 <iframe title="ytvideo" className="responsive-iframe" src="https://www.youtube.com/embed/AkbGz3CYvqE?&loop=1&autoplay=1&controls=0"></iframe>
                            </div>
                         
                     
                </div>
            </div>
        </div>
    </div>
</section>
</div>
  )
};

export default Services