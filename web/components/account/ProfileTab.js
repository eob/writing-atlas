import { CardTitleFooter } from '../cards/CardTitleFooter'

export default function ProfileTab({user}) {
  return (
    <CardTitleFooter title="Profile">
      <dl className="sm:divide-y sm:divide-gray-200">
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">
            Full name
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {user && user.name || "Unknown"}
          </dd>
        </div>
      </dl>
    </CardTitleFooter>
  )
}