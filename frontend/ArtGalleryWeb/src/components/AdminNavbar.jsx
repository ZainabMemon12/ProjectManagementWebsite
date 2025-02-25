import React from 'react'
import { Button } from 'antd'
import { useAuth } from '../contexts/AuthContext.jsx';

const AdminNavbar = ({searchQuery, setSearchQuery}) => {
    const { userData, logout } = useAuth();
    const handleLogout = async () => {
        await logout()
      }
  return (
    <>
     <div className="admin-navbar">
          <div className="logo">
            <div className="C-div"><h2>C</h2></div>
            <div className="logo-txt">
              <h2>COCREATE</h2>
            </div>
          </div>
          <i className="fa-solid fa-magnifying-glass fa-lg search"></i>
          <input type="search" placeholder='Search Employees or Project'value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />
          <Button className='logout-btn' onClick={handleLogout}> <i className="fa-solid fa-arrow-right-from-bracket logout"></i>logout</Button>
        </div>
    </>

  )
}

export default AdminNavbar