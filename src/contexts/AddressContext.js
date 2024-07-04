import React, { createContext, useState } from 'react';

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [latlng, setLatlng] = useState(null);
  const [country, setCountry] = useState(null);
  const [isLoggedIn,setLoggedIn]=useState(false);
  const [profilePicture,setProfilePicture]=useState(false);

  return (
    <AddressContext.Provider value={{ address, setAddress, latlng, setLatlng ,country, setCountry,isLoggedIn,setLoggedIn,profilePicture,setProfilePicture}}>
      {children}
    </AddressContext.Provider>
  );
};
