export default function PrivateBetaNotice() {
  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            📚 You've found our private beta!
          </h3>
          <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
            <p>
              To take a look, send us an email and say hello.
            </p>
          </div>

          <div className="mt-5">
            <a href="mailto:edward.benson@gmail.com">
              <button type="button" className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-50 focus:outline-none focus:border-blue-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                Email for Access
              </button>
            </a>
          </div>
        </div>
      </div>    
    </div>
  )
}