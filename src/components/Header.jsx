import React from 'react'
import icon from '../images/brand2.svg';
import logo from '../images/Naruto_logo.png';

const Header = () => {
  return (
    <div className="px-8 py-2 bg-white border-b border-black">
        <div className="flex justify-between">
            <div>
                <img src={icon} alt="icon"/>
            </div>
                <img src={logo} alt="logo" className="hidden md:block w-[5%]"/>
        </div>
    </div>
  )
}

export default Header