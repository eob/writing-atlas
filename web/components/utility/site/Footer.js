import Link from 'next/link';
import {LogInOut} from '../../account/LogInOut'

export default function Footer() {
return (
<div className="bg-gray-50 mt-48">
  <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
    <div className="md:grid md:grid-cols-4 md:gap-8">
      <div>
        <h4 className="text-sm leading-5 font-semibold tracking-wider text-gray-400 uppercase">
          Writing Atlas
        </h4>
        <ul className="mt-4">
          <li>
            <span className="text-base leading-6 text-gray-500 hover:text-gray-900">
              <a href="/about">About</a>
            </span>
          </li>
          <li className="mt-4">
            <span className="text-base leading-6 text-gray-500 hover:text-gray-900">
              <a href="/contact">Contact</a>
            </span>
          </li>
          <li className="mt-4">
            <span className="text-base leading-6 text-gray-500 hover:text-gray-900">
              <LogInOut type="link" />
            </span>
          </li>
        </ul>
      </div>
      <div className="mt-8 md:mt-0">
        <h4 className="text-sm leading-5 font-semibold tracking-wider text-gray-400 uppercase">
            My
        </h4>
        <ul className="mt-4">
          <li className="mt-4">
            <a href="/collection/favorites" className="text-base leading-6 text-gray-500 hover:text-gray-900">
              Favorites
            </a>
          </li>
          <li className="mt-4">
            <a href="/lists" className="text-base leading-6 text-gray-500 hover:text-gray-900">
              Lists
            </a>
          </li>
        </ul>
      </div>
      <div className="mt-8 md:mt-0">
        <h4 className="text-sm leading-5 font-semibold tracking-wider text-gray-400 uppercase">
            Browse
        </h4>
        <ul className="mt-4">
          <li className="mt-4">
            <a href="/authors" className="text-base leading-6 text-gray-500 hover:text-gray-900">
              Authors
            </a>
          </li>
          <li className="mt-4">
            <a href="/collections" className="text-base leading-6 text-gray-500 hover:text-gray-900">
              Collections
            </a>
          </li>
          <li className="mt-4">
            <a href="/tags" className="text-base leading-6 text-gray-500 hover:text-gray-900">
              Tags
            </a>
          </li>
          <li className="mt-4">
            <a href="/publications" className="text-base leading-6 text-gray-500 hover:text-gray-900">
              Publications
            </a>
          </li>
          <li className="mt-4">
            <a href="/recommendations" className="text-base leading-6 text-gray-500 hover:text-gray-900">
              Read if you Like...
            </a>
          </li>

        </ul>
      </div>
      <div className="mt-8 md:mt-0">
        <h4 className="text-sm leading-5 font-semibold tracking-wider text-gray-400 uppercase">
          Subscribe for Updates
        </h4>
        <iframe className="block" src="https://writingatlas.substack.com/embed" width="280" height="120" style={{background:"white", frameborder:"0", scrolling:"no"}}></iframe>
      </div>
    </div>
    <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
      <div className="flex md:order-2">
        <a href="https://www.twitter.com/WritingAtlas" className="ml-6 text-gray-400 hover:text-gray-500">
          <span className="sr-only">Twitter</span>
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
          </svg>
        </a>
        <a href="mailto:info@writingatlas.com" className="ml-6 text-gray-400 hover:text-gray-500">
          <span className="sr-only">Email</span>
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z"></path>
          </svg>
        </a>

      </div>
      <p className="mt-8 text-base leading-6 text-gray-400 md:mt-0 md:order-1">
        &copy; 2020 <a className="hu" href="https://www.writingatlas.com">Writing Atlas</a>. All rights reserved.
        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        Story art on Writing Atlas generated by OpenAI DALL-E 2
      </p>
    </div>
  </div>
</div>
  )
}  