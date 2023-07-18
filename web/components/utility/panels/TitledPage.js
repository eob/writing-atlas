export function TP_H1({children}) {
    return (
        <h3 className="mt-6 mb-3 text-lg font-medium leading-7 text-gray-800">{children}</h3>
    )
}

export function TP_P({children}) {
    return (
        <p className="mt-3 max-w-2xl text-md leading-7 text-gray-800 sm:mt-4">{children}</p>
    )

}
export function TitledPage({children, title}) {
    return (
        <div className="bg-white overflow-hidden shadow rounded-sm px-2 md:px-10 lg:px-20 pt-10">
            <h1 className="text-2xl md:text-3xl text-center leading-3 font-medium px-2 sm:px-6 md:px-10 py-4 md:py-6">{title}</h1>
            <div className="px-4 mb-10 sm:p-6">{children}</div>
        </div>
    )
}
