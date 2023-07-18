export function BookStat({title, value, subtitle}) {
  return (
    <div>
    <div className="px-4 py-5 sm:p-6">
      <dl>
        <dt className="text-base leading-6 font-normal text-gray-900">
          {title}
        </dt>
        <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
          <div className="flex items-baseline text-2xl leading-8 font-semibold text-indigo-600">
            {value}
            <span className="ml-2 text-sm leading-5 font-medium text-gray-500">
              {subtitle}
            </span>
          </div>
        </dd>
      </dl>
    </div>
  </div>    
  )
}

export default function BookStats({border, stats}) {
  let b = border ? ' shadow ' : ''
  return (
      <div>
        {/* <h3 className="text-lg leading-6 font-medium text-gray-900">
          Last 30 days
        </h3> */}  
        <div className={`mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden ${border} md:grid-cols-3`}>
          {stats && stats.map((stat) => <BookStat key={`bookstat-${stat.title}`} {...stat} />)}
        </div>
      </div>
    )    
}