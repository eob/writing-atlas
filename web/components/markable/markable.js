export default function Markable({children}) {
    return (
        <React.Fragment>
            <style jsx>{`
                .markable {
                    line-height: 0.25em + 1em;   
                }
            `}</style>    
            <div className="markable">
                {children}
            </div>
        </React.Fragment>
    )
} 