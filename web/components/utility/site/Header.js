import React from 'react'
import Navbar from './Navbar'

function MakeBreadcrumbs({crumbs}) {
    const separator = (
      <svg key="separator" className="flex-shrink-0 mx-2 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
      </svg>
    )

    const dots = (
      <svg key="dots" className="flex-shrink-0 mx-2 h-5 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path className="heroicon-ui" d="M4 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm8 2a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm8 2a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
      </svg>
    )

    const items = crumbs.map((crumb) => {
      return (
        <a key={`crumb-${crumb.text}`} href={crumb.link} className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out">{crumb.text}</a>
      )
    })

    let content = [];

    for (let i = 0; i < items.length; i++) {
      content.push(items[i]);
      if (i < (items.length - 1)) {
        content.push(separator)
      }
    }

    let contentSm = [];

    if (items.length < 3) {
      contentSm = content;
    } else {
      contentSm.push(items[0]);
      contentSm.push(separator)
      contentSm.push(<span>...</span>),
      contentSm.push(separator)
      contentSm.push(items[items.length - 1]);
    }
   
    return (
      <React.Fragment>
        <nav className="sm:flex hidden items-center text-sm leading-5 font-medium">
          {content}
        </nav>
        <nav className="sm:hidden flex items-center text-sm leading-5 font-medium">
          {contentSm}
        </nav>
      </React.Fragment>
    )
}

function Breadcrumbs({showBooks, showAuthor, showBook}) {
  let items = [];
  if (showBooks) {
    items.push({
      text: 'Authors',
      link: '/authors'
    })
  }
  if (showAuthor) {
    items.push({
      text: showAuthor.name,
      link: `/author/${showAuthor.handle}`
    })
  }
  if (showBook) {
    items.push({
      text: showBook.name,
      link: `/story/${showBook.handle}`
    })
  }

  return MakeBreadcrumbs({crumbs: items});
}

export default function Header({showBooks=false, showAuthor=false, showBook=false}) {
  let crumbs = Breadcrumbs({showBooks, showAuthor, showBook})
  crumbs = null;
  return (
    <Navbar crumbs={crumbs} />
  )
}