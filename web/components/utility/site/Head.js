import NextHead from 'next/head'

const SITE_NAME = 'Writing Atlas'

export default function Head({title}) {
  const titleOut = title ? `${title} - ${SITE_NAME}` : SITE_NAME
  return (
    <NextHead>
      <title>{titleOut}</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </NextHead>
  )
}