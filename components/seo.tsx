import Head from 'next/head'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Seo = ({ seoMetadata }: { seoMetadata: any }) => {
  const fields = seoMetadata?.fields ?? {}
  return (
    <Head>
      <title>{fields?.seoTitle ?? 'Nuna Covid-19 Assessment'}</title>
      <meta
        name="description"
        content={fields?.description ?? 'Nuna Covid-19 Assessment'}
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default Seo
