import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import AdminNavbar from '../components/AdminNavbar'
import AdminLeftNav from '../components/AdminLeftNav'
import GetAllEmployees from '../components/GetAllEmployees'

const AllEmployees = () => {
  const [searchQuery, setSearchQuery] = useState(""); 
    
  return (
    <div className='admin-dashboard'>
      <AdminNavbar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <div className="admin-main">
        <AdminLeftNav/>
        <div className="admin-main-right employeelist-admin-main-right">
          <div className="employee-txt">
          <div className="users-icon">
            <i className="fa-solid fa-users fa-lg"></i>
          </div>
          <div className="txt">
          <h1>Employees</h1>
          <p>Manage Your Employees</p>
          </div>
          <button className="add-btn">
              <i className="fa-solid fa-user-plus"></i>
              <Link to="/create-employee" className="link">
                Add Employee
              </Link>
            </button>
          </div>
          <GetAllEmployees searchQuery={searchQuery}/>
</div>
      </div>
    </div>
  )
}

export default AllEmployees