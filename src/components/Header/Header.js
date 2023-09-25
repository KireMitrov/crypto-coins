import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className='header'>
        <div className="width">
            <h1><Link to="/">Crypto Coins!</Link></h1>
        </div>
    </header>
  )
}
