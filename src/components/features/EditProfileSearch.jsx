//import { useEffect } from 'react';
import React, { useState } from 'react';
import BlogCard from '../BlogCard';
import "../../assets/NewFiles/Css/EditProfileSearch.css";

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   // Retrieve data from local storage
  //    const storedData = localStorage.getItem('formData');
  
    
  //   if (storedData) {
  //     try {
  //       const parsedData = JSON.parse(storedData);
  //       // Convert the parsed data to match the data structure
  //       const formattedData = parsedData.map(item => ({
  //         treeName: item.label || 'Unknown', // Assuming 'label' corresponds to 'treeName'
  //         uploadedBy: 'Unknown', // No equivalent field in parsedData, adjust as needed
  //         uploadedOn: item.uploadedOn || 'Unknown', // No equivalent field in parsedData, adjust as needed
  //         plantedOn: item.plantedOn || 'Unknown', // No equivalent field in parsedData, adjust as needed
  //         location: item.location || 'Unknown',
  //         image: item.imageURL || '/images/default.jpg', // Assuming 'imageURL' corresponds to 'image'
  //       }));
  //       setData(formattedData);
  //     } catch (error) {
  //       console.error('Error parsing stored data:', error);
  //     }
  //   }
  // }, []);


  
  const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
      treeName: false,
      uploadedBy: false,
      location: false,
    });
  
    const data=[{
      image:"images/Tree-images/mango.jpeg",
      treeName:"Mango",
      uploadedBy:"User 1",
      location:"Janata Colony, Indore, Madhya Pradesh 452002",
      plantedOn:"2024-06-23",
      uploadedOn:"2024-06-23T08:57:03.405Z",
  },{
    image:"images/Tree-images/Neem.jpeg",
    treeName:"Neem",
    uploadedBy:"User 2",
    location:"Janata Colony, Indore, Madhya Pradesh 452002",
    plantedOn:"2024-06-23",
    uploadedOn:"2024-06-23T08:57:03.405Z",
  },{
    image:"images/Tree-images/peepal.jpg",
    treeName:"peepal",
    uploadedBy:"User 3",
    location:"Janata Colony, Indore, Madhya Pradesh 452002",
    plantedOn:"2024-06-23",
    uploadedOn:"2024-06-23T08:57:03.405Z",
  },{
    image:"images/Tree-images/Neem.jpeg",
    treeName:"Neem",
    uploadedBy:"User 2",
    location:"Janata Colony, Indore, Madhya Pradesh 452002",
    plantedOn:"2024-06-23",
    uploadedOn:"2024-06-23T08:57:03.405Z",
  },{
    image:"images/Tree-images/peepal.jpg",
    treeName:"peepal",
    uploadedBy:"User 3",
    location:"Janata Colony, Indore, Madhya Pradesh 452002",
    plantedOn:"2024-06-23",
    uploadedOn:"2024-06-23T08:57:03.405Z",
  },]
  
  
    const handleInputChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const handleCheckboxChange = (e) => {
      const { name, checked } = e.target;
      setFilters({
        ...filters,
        [name]: checked,
      });
    };
  
    const filteredData = data.filter((item) => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      return (
        (!filters.treeName || item.treeName.toLowerCase().includes(lowerSearchTerm)) &&
        (!filters.uploadedBy || item.uploadedBy.toLowerCase().includes(lowerSearchTerm)) &&
        (!filters.location || item.location.toLowerCase().includes(lowerSearchTerm))
      );
    });
  
    return (
      <div className="search-component">
        <div className="filters">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
            className="search-input"
          />
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="treeName"
                checked={filters.treeName}
                onChange={handleCheckboxChange}
                className="checkbox-input"
              />
              Tree Name
            </label>
            <label>
              <input
                type="checkbox"
                name="uploadedBy"
                checked={filters.uploadedBy}
                onChange={handleCheckboxChange}
                className="checkbox-input"
              />
              Uploaded By
            </label>
            <label>
              <input
                type="checkbox"
                name="location"
                checked={filters.location}
                onChange={handleCheckboxChange}
                className="checkbox-input"
              />
              Location
            </label>
          </div>
        </div>
        <BlogCard data={filteredData} />
      </div>
    );
  };
  
  export default SearchComponent;
  
