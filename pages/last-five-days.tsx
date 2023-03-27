/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { SearchContext } from '../context/searchContext'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Head from 'next/head'
import { Button, Typography } from '@mui/material'
import Link from 'next/link'
import { AiOutlineCheck } from 'react-icons/ai'
import { useRouter } from 'next/router'

const LastFiveDays = () => {
  // @ts-ignore
  const { storedValue, setStoredValue } = React.useContext(SearchContext)
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setStoredValue({
      ...storedValue,
      // @ts-ignore
      fiveDays: e.target.innerText === 'Yes',
    })
    router.push('/zip-code')
  }

  return (
    <div className={'container'}>
      <main className={'main'}>
        <Head>
          <title>COVID-19 Assessment | Last five days</title>
          <meta
            name="description"
            content="COVID-19 Assessment | Last five days"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Grid
          container
          alignItems="start"
          justifyContent="center"
          style={{
            minHeight: '75vh',
            marginTop: '5rem',
          }}
        >
          <Grid
            item
            sx={{
              width: '100%',
              maxWidth: 'md',
              backgroundColor: '#5E3D94',
              borderRadius: '25px',
              padding: '0 2rem',
            }}
          >
            <Box
              className="questionBox"
              sx={{
                margin: '2rem 0',
                padding: '2rem',
                width: '100%',
              }}
            >
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                columnGap={1.5}
                sx={{ flexGrow: 1 }}
              >
                <Grid className="progressBars" item xs={2}>
                  <Link href="/assessment">
                    <Box
                      sx={{
                        borderRadius: '25px',
                        backgroundColor: '#B793F0',
                        height: '1rem',
                      }}
                    ></Box>
                  </Link>
                </Grid>
                <Grid className="progressBars" item xs={2}>
                  <Box
                    sx={{
                      borderRadius: '25px',
                      backgroundColor: '#B793F0',
                      height: '1rem',
                    }}
                  ></Box>
                </Grid>
                <Grid className="progressBars" item xs={2}>
                  <Box
                    sx={{
                      borderRadius: '25px',
                      backgroundColor: '#765AA4',
                      height: '1rem',
                    }}
                  ></Box>
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                rowGap={2}
              >
                <Grid item>
                  <Typography variant="h4" component="div" className="question">
                    Did you start feeling sick less than 7 days ago?
                  </Typography>
                </Grid>
                <Grid item sx={{ paddingBottom: '4rem' }}>
                  <Button
                    variant="contained"
                    className={'assessmentStart'}
                    onClick={handleClick}
                    startIcon={
                      storedValue?.fiveDays ? <AiOutlineCheck /> : null
                    }
                    size="large"
                    sx={{ marginRight: '10px' }}
                  >
                    Yes
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleClick}
                    className={'assessmentStart'}
                    startIcon={
                      storedValue?.fiveDays === false ? (
                        <AiOutlineCheck />
                      ) : null
                    }
                    sx={{ marginLeft: '10px' }}
                  >
                    No
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}

export default LastFiveDays
