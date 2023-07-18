import {LogInOut} from '../../account/LogInOut'
import { useRouter } from "next/router"
import { useUser } from '@auth0/nextjs-auth0';
import { useState, useRef, useEffect, Fragment } from 'react'
import { createDashboardUrl, createLoginUrl, createLogoutUrl } from '../../account/LogInOutHelper'


export function NavUser() {
  const { user, isLoading } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const lostFocus = (e) => {
      if (e.target !== dropdownRef && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }

    };
    window.addEventListener("click", lostFocus);
    return () => {
      window.removeEventListener("click", lostFocus);
    };
  }, []);

  let userRegion = (
    <a href={createLoginUrl()} className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">
      <span>Sign In</span>
    </a>
  )

  if (!user && isLoading) {
    userRegion = null;
  } else if (user) {
    let userInitials = "ME";
    if (user.given_name && user.family_name) {
      userInitials = `${user.given_name[0]}${user.family_name[0]}`
    } else if (user.name) {
      userInitials = user.name[0]
    }
    let userPicture =  (
      <div className="flex bg-indigo-600 p-1 rounded-full items-center justify-center text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <span className="w-5 h-5">{userInitials}</span>
      </div>
    );
    if (user.picture) {
      userPicture = <img className="h-8 w-8 rounded-full" src={user.picture} alt="" />
    }
    userRegion = <Fragment>
      <div>
        <button type="button" className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu" aria-expanded="false" aria-haspopup="true" ref={dropdownRef} onClick={() => setDropdownOpen(!dropdownOpen)}>
          <span className="sr-only">Open user menu</span>
          {userPicture}
        </button>
      </div>
      {dropdownOpen && (
        <div className="origin-top-right absolute right-0 mt-5 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
          {/* <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-200"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          --> */}
          {/* <a href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Account</a> */}
          <a href={createLogoutUrl()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
          <a href={createDashboardUrl()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Dashboard</a>
        </div>
      )}
    </Fragment>
  }
  return userRegion
}

/**
 * Top-level search bar that searches all short stories
 * TODO: Implement auto-fill/suggested results
 *
 * @author eric-zhizu
 * @returns {JSX.Element}
 * @constructor
 */
function TopSearchBar() {
  return (
      <div className="relative flex-1 ml-3 mr-3 md:ml-0 md:mr-0">
        <form role="search" action="/stories">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="search"
            name="search"
            className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search Stories"
            aria-label="Search short stories"
          />
        </form>
      </div>
  )
}

export default function Navbar({crumbs}) {

  const router = useRouter();
  const ACTIVE = 'border-transparent text-gray-900'
  const INACTIVE = 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'

  const collections = router.pathname.indexOf('/collections') > -1 ? ACTIVE : INACTIVE;
  const lists = router.pathname.indexOf('/lists') > -1 ? ACTIVE : INACTIVE;
  const tags = router.pathname.indexOf('/tags') > -1 ? ACTIVE : INACTIVE;
  const authors = router.pathname.indexOf('/authors') > -1 ? ACTIVE : INACTIVE;
  const honors = router.pathname.indexOf('/honors') > -1 ? ACTIVE : INACTIVE;
  const publications = router.pathname.indexOf('/publications') > -1 ? ACTIVE : INACTIVE;

  return (
    <div className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-3 md:justify-start md:space-x-10">
          <div className="lg:w-0 lg:flex-1">
            <h2 className="text-lg font-bold leading-7 text-gray-900 sm:text-xl sm:leading-9 sm:truncate">
              <a href="https://www.writingatlas.com" className="flex">
                Writing Atlas
              </a>
              {crumbs}
            </h2>
          </div>
          <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
          <a href="/authors" className={`${authors} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
              Authors
            </a>
            <a href="/lists" className={`${lists} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
              Lists
            </a>
            <a href="/collections" className={`${collections} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
              Collections
            </a>
            <a href="/honors" className={`${honors} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
              Honors
            </a>
            <a href="/tags" className={`${tags} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
              Tags
            </a>
            <a href="/publications" className={`${publications} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
              Publications
            </a>
          </div>

          <TopSearchBar />

          <div className="-mr-2 -my-2 md:hidden">
            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex items-center justify-end space-x-8">
            <NavUser />
          </div>
        </div>
      </div>

      <div className="absolute top-0 inset-x-0 transition transform origin-top-right md:hidden">
        <div className="rounded-lg shadow-lg">
          <div className="rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold leading-7 text-gray-900 sm:text-xl sm:leading-9 sm:truncate">
                  <a href="https://www.writingatlas.com" className="flex">
                    Writing Atlas
                  </a>
                  {crumbs}
                </h2>
                <TopSearchBar />
                <div className="-mr-2">
                  <NavUser />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>    
  )
}