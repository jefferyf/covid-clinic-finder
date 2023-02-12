/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import '@material/layout-grid/dist/mdc.layout-grid.css'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import '@material/button/dist/mdc.button.css'
import { Typography } from '@mui/material'
import { client } from '../lib/api'
import ContentfulRichText from '../components/contentfulRichText'
import { TiDocumentText } from 'react-icons/ti'
import Seo from '../components/seo'

export default function Home({ homePage }: { homePage: any }) {
  React.useEffect(() => {
    window.localStorage.clear()
  }, [])

  const [embed, setEmbed] = React.useState(undefined)
  React.useEffect(() => {
    if (embed === undefined) {
      setEmbed(homePage.homePageCopy)
    }
  }, [embed, homePage.homePageCopy])

  return (
    <div className={'container'}>
      <Seo seoMetadata={homePage?.seoMetadata}></Seo>

      <main className="main">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '75vh' }}
        >
          <Grid item>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="h1"
                component="div"
                sx={{
                  fontWeight: '700',
                  fontSize: '82px',
                  lineHeight: '87px',
                  textAlign: 'center',
                }}
              >
                {homePage?.headline}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <Button
                className="assessmentStart"
                variant="contained"
                startIcon={<TiDocumentText size={'45px'} />}
                href="/assessment"
                size="large"
                style={{
                  margin: '2rem 0',
                  padding: '1rem 2rem',
                }}
              >
                <Box>
                  <Typography variant="body1">See if you qualify</Typography>
                  <Typography variant="body2">in under 3 minutes</Typography>
                </Box>
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ textAlign: 'center', width: '100%', maxWidth: 'sm' }}>
                {embed ? <ContentfulRichText richText={embed} /> : null}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}

// @ts-ignore
export const getStaticProps = async () => {
  try {
    const response = await client
      .getEntries({ content_type: 'homePage' })
      .then((response: any) => response.items)

    return {
      props: {
        homePage: response[0].fields ?? null,
      },
    }
  } catch (e) {
    console.warn(e)
    return {
      props: {
        homePage: null,
      },
    }
  }
}
