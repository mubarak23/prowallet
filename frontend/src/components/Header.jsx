import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link to="/" className="navbar-brand">ProWallet</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link to="/" className="nav-link" >Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link" >Register</Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link" >Login</Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link" >Wallet</Link>
      </li>
    </ul>
  </div>
</nav>
    </div>
  )
}

export default Header