export default function EntityPhoto({author}) {
    let authorImageUrl = `/images/author/${author.handle}.png`
    return (
        <img className="h-36 w-36 inline-block rounded-full border-4 border-white mb-4" src={authorImageUrl} alt={`${author.name} Photo`} />
    )
}