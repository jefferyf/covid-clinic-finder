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
import { CgLoadbarDoc } from 'react-icons/cg'
import Seo from '../components/seo'
import { IHomePageFields } from '../@types/generated/contentful'
import { EntryCollection } from 'contentful'

export default function Home({ homePage }: { homePage: IHomePageFields }) {
  React.useEffect(() => {
    window.localStorage.clear()
  }, [])

  const [embed, setEmbed] = React.useState(undefined)
  React.useEffect(() => {
    if (embed === undefined) {
      // @ts-ignore
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
          sx={[
            {
              '@media (min-width:600px)': {
                marginTop: '3rem',
              },
            },
            { minHeight: '75vh' },
          ]}
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
              <Typography className="headline" variant="h1" component="div">
                {homePage?.headlineCopy ? (
                  <ContentfulRichText richText={homePage.headlineCopy} />
                ) : null}
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
                startIcon={<CgLoadbarDoc size={'45px'} />}
                href="/assessment"
                size="large"
                sx={[
                  {
                    '@media (max-width:600px)': {
                      width: '100%',
                    },
                  },
                  {
                    margin: '2rem 0',
                    padding: '2rem',
                    width: '325px',
                    textTransform: 'none',
                  },
                ]}
              >
                <Box sx={{ padding: '.5rem' }}>
                  <p
                    style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      lineHeight: '20px',
                      letterSpacing: '0.1',
                      padding: '0',
                      margin: '3px',
                    }}
                  >
                    See if you qualify
                  </p>
                  <p
                    style={{
                      fontSize: '17px',
                      lineHeight: '20px',
                      fontWeight: '400',
                      padding: '0',
                      margin: '3px',
                    }}
                  >
                    in under 3 minutes
                  </p>
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
              <Box
                sx={{
                  textAlign: 'center',
                  width: '100%',
                  maxWidth: 'sm',
                  paddingTop: '2rem',
                }}
              >
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
      .then((response: EntryCollection<IHomePageFields>) => response.items)

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
