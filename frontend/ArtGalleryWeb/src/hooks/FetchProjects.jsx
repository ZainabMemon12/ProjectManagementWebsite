import React from 'react'

const FetchProjects = async () => {
 try{
    const response = await fetch('project-management-website-z.vercel.app/api/project/');
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
