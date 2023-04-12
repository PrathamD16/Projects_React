import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="space-y-5">
      <nav className="bg-slate-800 text-white flex items-center justify-between px-7">
        <ul className="py-5 md:flex md:justify-start md:space-x-14 text-2xl font-serif">
          <Link to="/">
            <li className="cursor-pointer">
              Home
            </li>
          </Link>
          <hr className="md:hidden" />
          <Link to="/create">
            <li className="cursor-pointer">Add Exercise</li>
          </Link>
          <hr className="md:hidden" />
          <Link to="/adduser">
            <li className="cursor-pointer">Add User</li>
          </Link>
          <hr className="md:hidden" />
          <li className="cursor-pointer">About</li>
          <hr className="md:hidden" />
          {/* <img src='favicon.ico' alt="IMG" className="sm:hidden" /> */}
        </ul>
        <div className='hidden md:block'> 
          <h1 className="italic text-4xl font-semibold font-[cursive]">FitTrack</h1>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
