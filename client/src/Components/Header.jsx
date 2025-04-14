import React from 'react'
import { FaSearch } from "react-icons/fa";
import {Link, NavLink } from 'react-router-dom';

export default function Header() {
  
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
        <h1 className='font-bold text-sm sm'>
          <span className='text-slate-500'>Deepanshu</span>
          <span className='text-slate-700'>Estate</span>
        </h1>  
        </Link>
        <form className='bg-slate-100 p-2 rounded-lg flex gap-1 items-center md:p-3'>
          <input type="text" placeholder='Search...' className='bg-transparent text-sm focus:outline-none w-24 sm:w-54' /> 
          <FaSearch className='font-semibold'/>   
        </form>
        <ul className='flex gap-4'>
          <NavLink to="/">
          <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
          </NavLink>
          <NavLink to="/about">
          <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>  
          </NavLink>
          <NavLink to="/signin">
          <li className='sm:inline text-slate-700 hover:underline'>SignIn</li>
          </NavLink>
        </ul>
      </div>
    </header>
  )
}
