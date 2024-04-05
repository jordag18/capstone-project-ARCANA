import React from 'react'
import Link from 'next/link';
import MoveToNav from '../components/projectComponents/MoveToProjects';

const TopNav = () => {
    return (
      <div className="navbar bg-black text-neutral-content">
        <div className="navbar-start">
            <div className="w-36">
                <Link href={'/'}>
                <img src="/devcom_arl.png" />
                </Link>
            </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <li className='hover:bg-stone-600 rounded-md'>
                <MoveToNav linkTo='/dashboard' buttonText='ARCANA' />
            </li>
            <li  className='hover:bg-stone-600 rounded-md'>
                <MoveToNav linkTo='/dashboard/projectsMenu' buttonText='Manage Projects' />
            </li>
            <li>
                <details>
                    <summary>
                        <MoveToNav linkTo='/dashboard/syncMenu' buttonText='Sync Menu' />
                    </summary>
                    <ul className="p-2 bg-black rounded-t-none">
                        <li><MoveToNav linkTo='/dashboard/syncMenu/syncProjects' buttonText='Sync Projects' /></li>
                        <li><MoveToNav linkTo='/dashboard/syncMenu/viewSyncedProjects' buttonText='viewSyncedProjects' /></li>
                    </ul>
                </details>
            </li>
            <li  className='hover:bg-stone-600 rounded-md'>
                <MoveToNav linkTo='/dashboard/eventMenu' buttonText='Manage Events' />

            </li>
            <li  className='hover:bg-stone-600 rounded-md'>
                <MoveToNav linkTo='/dashboard/eventGraphMenu' buttonText='Manage Graphs' />

            </li>
            <li  className='hover:bg-stone-600 rounded-md'>
                <MoveToNav linkTo='/dashboard/systemMenu' buttonText='System Settings' />

            </li>
          </ul>
        </div>
        <div className="navbar-end">
            <p className='text-lg font-bold pr-2'>Analyst</p>
            <div className='avatar placeholder'>
                <div className='bg-stone-600 text-neutral-content rounded-full w-12'>
                    <span className='text-2xl'>A</span>
                </div>
            </div>
        </div>
      </div>
    );
  };
  
  export default TopNav;
