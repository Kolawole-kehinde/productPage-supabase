import React from 'react'
import { Link } from 'react-router'

const Logo = ({toggleMenu}) => {
  return (
    <div>
          <Link to="/" onClick={toggleMenu} className="text-3xl font-bold text-gray-800">
          Store
        </Link>
    </div>
  )
}

export default Logo