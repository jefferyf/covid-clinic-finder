/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid'
import React from 'react'
import ContentfulRichText from '../components/contentfulRichText'
import Seo from '../components/seo'
import { client } from '../lib/api'

const PrivacyPolicy = ({ privacyPolicyPage }: { privacyPolicyPage: any }) => {
  return (
    <div className={'container'}>
      <main className="main">
        <Seo seoMetadata={privacyPolicyPage.seoMetadata} />
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
              <ContentfulRichText
                richText={privacyPolicyPage.privacyPolicy}
              ></ContentfulRichText>
            </Box>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}

export default PrivacyPolicy

// @ts-ignore
export const getStaticProps = async () => {
  try {
    const response = await client
      .getEntries({ content_type: 'privacyPolicyPage' })
      .then((response: any) => response.items)

    return {
      props: {
        privacyPolicyPage: response[0].fields ?? null,
      },
    }
  } catch (e) {
    console.warn(e)
    return {
      props: {
        privacyPolicyPage: null,
      },
    }
  }
}
