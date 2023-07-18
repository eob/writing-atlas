export function CardGrid({children}) {
    return (
      <div className="mt-12 grid gap-5 max-w-sm md:max-w-lg mx-auto md:grid-cols-2 lg:grid-cols-3 lg:max-w-none">{children}</div>        
    )    
}

export function Card({name, img, children}) {
  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden mb-5 sm:mb-0">
      <div className="flex-shrink-0">
        <img className="h-48 w-full object-cover" src={img || "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"} alt="" />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
            {name && (
              <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900">
                {name}
              </h3>
            )}
            <p className="mt-3 text-base leading-6 text-gray-500">
              {children}
            </p>
        </div>
      </div>
    </div>
  )
}
