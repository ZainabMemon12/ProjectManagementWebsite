import React from 'react'

const FetchEmployees = async () => {
    try {
      const response = await fetch('https://projectmanagementwebsite.onrender.com/api/admin/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return (data);
    } catch (error) {
      console.error('error fetching employees',error);
      throw error;
    }
  };

export default FetchEmployees
