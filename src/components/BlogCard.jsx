import React from 'react';


const BlogCard = ({ data }) => {
  return (
    <section className="blog-two pt-20 pb-20 blog-card-section">
      <div className="container">
        <div className="row g-4">
          {data.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6 wow fadeInDown" data-wow-duration="1.2s" data-wow-delay=".2s">
              <div className="donation__item blog-two__item bor blog-card-item" style={{ height: '100%' ,padding:'1px',margin:'0px' ,backgroundColor:'#8BC34A',borderRadius:'8px'}}>
                <div className="blog-two__image mb-85" >
                  <div className="image" >
                    <img src={item.imageUrl} alt={item.Plant_name} style={{ height: '100%' }} />
                    <div className="blog-two__info">
                      <h4 style={{paddingBottom:'0',marginBottom:'10'}}>{item.Plant_name}</h4>
                    </div>
                  </div>
                </div>
                <h3 style={{marginLeft:'10px'}}><a href="/" style={{color:'black'}}>Planted by:{item.users_username}</a></h3>
                <h2 style={{marginLeft:'10px'}}><p>Uploaded On: {new Date(item.createdAt).toDateString()}</p></h2>
                <h2 style={{marginLeft:'10px'}}><p>Planted On: {new Date(item.plantedOn).toDateString()}</p></h2>
                <h2 style={{marginLeft:'10px',marginBottom:'10px'}}><a href="/"><p>Location: {item.Address}</p></a></h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogCard;
