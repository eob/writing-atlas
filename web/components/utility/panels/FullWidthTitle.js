export default function FullWidthTitle({children, links, left, title, subtitle, subsubtitle, tight}) {
    let py = (tight === true) ? 'py-4 md:py-6' : 'py-12 md:py-15'
    return (
      // <div className={`${py} px-2 sm:px-14 lg:px-16 border-b-2 border-gray-200`}>
      <div className="relative bg-gray-50 pt-12 md:pt-16 sm:px-6 lg:px-8">
        <div className="relative max-w-4xl mx-auto">

        <div className="mx-auto flex flex-row">
          {left}
          <div className="flex-1 ml-2 md:ml-8">
            <h2 className="pt-1 md:pt-2 text-3xl md:text-4xl leading-1 font-medium text-gray-900">
              {title}
            </h2>
            <h3 className="text-lg md:text-xl leading-1 font-medium text-gray-500">
              {subtitle}
            </h3>
            {subsubtitle && (
              <h4 className="text-md pt-1 leading-1 font-medium text-gray-500">
                {subsubtitle}
              </h4>
            )}
            {links && (
              <div className="pt-2 flex">
                {links}
              </div>
            )}
          </div>
          {children}
        </div>
      </div></div>
  )
}
