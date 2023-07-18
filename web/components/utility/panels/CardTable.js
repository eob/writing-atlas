export default function CardTable({children}) {
  return (
    <div className="-my-5 -mx-5 sm:-my-6 sm:-mx-6 px-0 mx-none">
      <div className="align-middle inline-block min-w-full shadow sm:rounded-lg border-b border-gray-200">
        <table className="table-fixed min-w-full">
          {children}
        </table>
      </div>
    </div>
  )
}