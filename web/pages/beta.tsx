import RedirectToLogin from '../components/login-redirect'
import { useUser } from '@auth0/nextjs-auth0';

export function BetaWall() {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-xl leading-6 font-medium text-gray-900" id="modal-title">
                Writing Atlas
              </h3>
              <div className="mt-2">
                <p className="text-md text-gray-500">
                  Some areas of our site are currently in a closed beta.. and you've found one of them!
                </p>
                <p className="text-md text-gray-500 mt-4">
                  Reach out at contact@writingatlas.com if you are interested in learning more. 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  return <BetaWall />
}