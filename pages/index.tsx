/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import Head from 'next/head'
import '@material/layout-grid/dist/mdc.layout-grid.css'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import '@material/button/dist/mdc.button.css'
import Card from '@mui/material/Card'
import { CardContent, Typography, CardMedia } from '@mui/material'
import { MdOutlineArticle } from 'react-icons/md'
import Link from 'next/link'
import Image from 'next/image'
import { deepPurple } from '@mui/material/colors'
import { client } from '../lib/api'
import ContentfulRichText from '../components/contentfulRichText'

export default function Home({ homePage }: { homePage: any }) {
  React.useEffect(() => {
    window.localStorage.clear()
  }, [])

  return (
    <div className={'container'}>
      <Head>
        <title>{homePage?.seoMetadata?.fields?.seoTitle}</title>
        <meta
          name="description"
          content={homePage?.seoMetadata?.fields?.description}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div>
          <Grid container style={{ minHeight: '100vh' }}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Card
                sx={{ boxShadow: '0' }}
                style={{ backgroundColor: '#f3de00' }}
              >
                <Link href="/">
                  <Image
                    src="/header.png"
                    alt="header"
                    width={568}
                    height={152}
                  />
                </Link>
              </Card>

              <Card
                variant="outlined"
                sx={{
                  borderRadius: '20px',
                  backgroundColor: '#472B77',
                  color: 'white',
                }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h3" component="div">
                    {homePage?.headline}
                  </Typography>

                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Grid xs={1} item></Grid>
                    <Grid xs={2} item>
                      <MdOutlineArticle className={'roundedIcon'} />
                    </Grid>
                    <Grid xs={9} item sx={{ paddingLeft: '1rem' }}>
                      <ContentfulRichText richText={homePage.homePageCopy} />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="flex-end"
                sx={{
                  margin: '2rem 0',
                }}
              >
                <Grid xs={7} item></Grid>
                <Grid xs={5} item>
                  <Button
                    sx={{
                      backgroundColor: '#472b77',
                      '&:hover': { backgroundColor: deepPurple[700] },
                    }}
                    variant="contained"
                    href="/assessment"
                    className="clickHere"
                  >
                    Click Here
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Box
              component={Grid}
              item
              md={6}
              display={{ xs: 'none', sm: 'none', md: 'flex' }}
            >
              <Card
                sx={{
                  width: '100%',
                  height: '100%',
                  border: '0',
                  boxShadow: '0',
                }}
              >
                <CardMedia
                  sx={{ height: '100%', backgroundSize: 'cover' }}
                  image="/testit.png"
                  title="header"
                />
              </Card>
            </Box>
          </Grid>
        </div>
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
        clinic: null,
      },
    }
  }
}
