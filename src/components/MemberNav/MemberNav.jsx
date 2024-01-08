import React from 'react'
import { Link } from 'react-router-dom'

function MemberNav() {
  return (
    <div>
        <div className="m_nav_items">
            <div className="m_nav_item flex">
                Enablers
            </div>
            <div className="m_nav_item">
                Companies
            </div>
            <Link to={'/members/requests'}>
                <div className="m_nav_item">
                    Requests
                </div>
            </Link>
        </div>
    </div>
  )
}

export default MemberNav
