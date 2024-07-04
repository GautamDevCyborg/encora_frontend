import React from 'react';
import DataMap from '../components/features/DataMap';

const Map = () => {
  return (
    <div>

        <section className="bg-image pt-40 pb-40">
            <div className="container">
                <h2 className="wow fadeInUp" data-wow-duration="1.2s" data-wow-delay=".2s">Map</h2>
               
            </div>
        </section>

        <DataMap/>
    </div>
  )
}

export default Map