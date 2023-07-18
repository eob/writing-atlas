import Error from 'next/error'

export default function NoData({code=null, title=null, body=null}) {
  return (
    <div className="flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-center text-gray-700">
        <div className="max-w-lg">
          {code && (<div className="text-5xl font-dark font-bold">404</div>)}
          {title && (<p className="text-2xl md:text-3xl font-light leading-normal">{title}</p>)}
          {body && (<p>{body}</p>)}
        </div>    
      </div>
    </div>  
  )
}