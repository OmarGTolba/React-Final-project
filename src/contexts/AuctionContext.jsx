import React, { createContext, useState, useEffect } from 'react';

const AuctionContext = createContext();

export const AuctionProvider = ({ children }) => {

  const [auction, setAuction] = useState([]);


  
  const fetchAuction = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/get-bids');
      if (!response.ok) {
        throw new Error('Failed to fetch Auction');
      }
      const data = await response.json();
      setAuction(data.bids);
    } catch (error) {
      console.error('Error fetching Auction:', error);
    }
  };

  useEffect(() => {
    fetchAuction();
  }, []); 
  
  return (
    <AuctionContext.Provider value={{ auction, setAuction }}>
      {children}
    </AuctionContext.Provider>
  );
};

export default AuctionContext;
