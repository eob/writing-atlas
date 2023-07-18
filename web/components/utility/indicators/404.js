import Error from 'next/error'

export default function MyError({message}) {
  return (
   <Error statusCode={404} />
  )
}