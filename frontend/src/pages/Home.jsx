import React from 'react'
import { Link }  from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'
function Home() {
  return (
    <>
      <p>Please Select an Option Below</p>
      <Link to='/newTicket' className='btn btn-success btn-md'>
        <FaQuestionCircle />Fund Wallet
      </Link>
      <Link to='/tickets' className='btn btn-primary btn-md'>
        <FaTicketAlt />View Wallet Transaction
      </Link>
    </>
  )
}

export default Home