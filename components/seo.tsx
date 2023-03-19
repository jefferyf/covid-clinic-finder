import { Entry } from 'contentful'
import Head from 'next/head'
import React from 'react'
import { ISeoMetaTagsFields } from '../@types/generated/contentful'

const Seo = ({ seoMetadata }: { seoMetadata: Entry<ISeoMetaTagsFields> }) => {
  const fields = seoMetadata?.fields ?? {}
  return (
    <Head>
      <title>{fields?.seoTitle ?? 'COVID-19 Assessment'}</title>
      <meta
        name="description"
        content={fields?.description ?? 'COVID-19 Assessment'}
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default Seo
