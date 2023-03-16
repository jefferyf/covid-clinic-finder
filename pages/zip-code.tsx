/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { SearchContext } from '../context/searchContext'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Head from 'next/head'
import { Button, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

const ZipCode = () => {
  // @ts-ignore
  const { storedValue, setStoredValue } = React.useContext(SearchContext)
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    router.push(`/clinics?zipcode=${storedValue.zipCode}`)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoredValue({
      ...storedValue,
      zipCode: e.target.value,
    })
  }

  return (
    <>
      <div className={'container'}>
        <main className={'main'}>
          <Head>
            <title>Covid-19 Assessment | Last five days</title>
            <meta
              name="description"
              content="Covid-19 Assessment | Last five days"
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
                    <Link href="/last-five-days">
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
                </Grid>
              </Box>

              <Box>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  rowGap={4}
                >
                  <Grid item>
                    <Typography variant="h4" component="div">
                      You may be recommended to take COVID medication.
                    </Typography>
                    <Typography variant="body1">
                      Enter your zip code to find an Indian Health Care Provider
                      near you for FREE treatment.
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sx={[
                      {
                        '@media (min-width: 0px) and (max-width: 415px)': {
                          width: '100%',
                        },
                      },
                      { width: '60%', maxWidth: 'sm' },
                    ]}
                  >
                    <div>
                      <input
                        type="text"
                        name="zipCode"
                        onChange={handleChange}
                        value={storedValue?.zipCode}
                        placeholder="Enter Zip Code"
                        style={{
                          width: '100%',
                          height: '75px',
                          borderRadius: '10px',
                          textAlign: 'center',
                          fontSize: '24px',
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item sx={{ marginBottom: '5rem' }}>
                    <Button
                      variant="contained"
                      onClick={handleClick}
                      className={'assessmentStart'}
                      size="large"
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </main>
      </div>
    </>
  )
}

export default ZipCode
