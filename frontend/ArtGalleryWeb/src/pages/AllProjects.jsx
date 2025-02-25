import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import AdminLeftNav from '../components/AdminLeftNav'
import GetAllProjects from '../components/GetAllProjects'

const AllProjects = () => {
  return (
    <>
    <div className="admin-dashboard">
      <AdminNavbar/>
      <div className="admin-main">
        <AdminLeftNav/>
        <div className="admin-main-right"
         style={{padding:"2px"}}
         >
          <GetAllProjects/>
        </div>
      </div>
    </div>
    </>
  )
}

export default AllProjects