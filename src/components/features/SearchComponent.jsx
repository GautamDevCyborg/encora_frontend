import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../BlogCard';
import "../../assets/NewFiles/Css/searchcomponent.css";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    treeName: false,
    uploadedBy: false,
    location: false,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_ALL_POSTS, {
          withCredentials: true,
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
      (!filters.treeName || item.Plant_name.toLowerCase().includes(lowerSearchTerm)) &&
      (!filters.uploadedBy || item.associated_user_id.toLowerCase().includes(lowerSearchTerm)) &&
      (!filters.location || item.Address.toLowerCase().includes(lowerSearchTerm))
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
