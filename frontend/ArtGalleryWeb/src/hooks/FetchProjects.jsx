import React from 'react'

const FetchProjects = async () => {
 try{
    const response = await fetch('http://localhost:4000/api/project/');
    if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }const data = await response.json()
    return (data);
 }catch(error){
  console.error("error fetching employees",error)  
throw error
 }
};

export default FetchProjects
