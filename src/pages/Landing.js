import React from 'react'

import Banner from '../components/landing/Banner';
import AboutUs from '../components/landing/AboutUs';
import Services from '../components/landing/Services';
import Achievements from '../components/landing/Achievements';

import Gallery from '../components/features/Gallery';
import Countdown from '../components/features/Countdown';


const Landing = () => {
    const targetDate = '2024-12-31T00:00:00';
  return (
    <div>  
    <Banner/>
    <AboutUs/>
    <Achievements/>
    <Services/>
    <Gallery/>
    <Countdown targetDate={targetDate}/> 
</div>
  )
}

export default Landing