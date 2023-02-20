import React from 'react'
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid'
import ContentfulRichText from '../components/contentfulRichText'
import Seo from '../components/seo'
import { client } from '../lib/api'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { IGenericPageFields } from '../@types/generated/contentful'
import { EntryCollection, Entry } from 'contentful'

interface IParams extends ParsedUrlQuery {
  slug: string
}

const GenericPage = ({ page }: { page: Entry<IGenericPageFields> }) => {
  return (
    <div className={'container'}>
      <main className="main">
        <Seo seoMetadata={page?.fields?.seoMetadata} />
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '75vh' }}
        >
          <Grid item>
            <Box
              sx={{
                margin: '5rem 0 2rem 0',
                padding: '2rem',
                width: '100%',
                maxWidth: 'md',
                backgroundColor: '#5E3D94',
                borderRadius: '25px',
              }}
            >
              {page ? (
                <ContentfulRichText
                  richText={page?.fields?.contentBlock}
                ></ContentfulRichText>
              ) : (
                <h1>Page not found</h1>
              )}
            </Box>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}
export default GenericPage

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams

  const data: EntryCollection<IGenericPageFields> = await client.getEntries({
    content_type: 'genericPage',
    'fields.slug[in]': slug,
  })

  const page = data.items.length ? data.items[0] : undefined

  return {
    props: { page },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages: Entry<IGenericPageFields>[] = await client
    .getEntries({ content_type: 'genericPage' })
    .then((response: EntryCollection<IGenericPageFields>) => response.items)

  const paths = pages.map((page: Entry<IGenericPageFields>) => ({
    params: {
      slug: page.fields.slug,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}
