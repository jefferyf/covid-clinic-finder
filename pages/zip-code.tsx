/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { SearchContext } from '../context/searchContext'
import styles from '../styles/Assessment.module.css'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Head from 'next/head'
import { Button, Card, CardContent, Typography } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Assessment = () => {
  // @ts-ignore
  const { storedValue, setStoredValue } = React.useContext(SearchContext)
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    router.push(`/clinics/${storedValue.zipCode}`)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e)
    setStoredValue({
      ...storedValue,
      zipCode: e.target.value,
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Covid-19 Assessment</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <div>
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

            <Card className={styles.assessmentCard}>
              <CardContent>
                <Grid
                  container
                  alignContent={'center'}
                  justifyContent={'center'}
                >
                  <Grid item xs={1}>
                    <img src="/pattern.png" alt="pattern"></img>
                  </Grid>
                  <Grid item xs={10} sx={{ padding: '2rem' }}>
                    {/* <pre>{JSON.stringify(storedValue)}</pre> */}
                    <Typography variant="h4" component="div">
                      Please Enter your Zip Code.
                    </Typography>

                    <div>
                      <input
                        type="text"
                        name="zipCode"
                        onChange={handleChange}
                        value={storedValue?.zipCode}
                      />
                    </div>

                    <Button
                      variant="contained"
                      className={styles.answerButton}
                      onClick={handleClick}
                    >
                      Enter
                    </Button>
                  </Grid>
                  <Grid item xs={1}>
                    <img src="/pattern.png" alt="pattern"></img>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ flexGrow: 1, marginTop: '2rem' }}
            >
              <Grid item xs={3.75} sx={{ border: '1px solid black' }}>
                <Link href="/assessment">
                  <Box
                    sx={{ backgroundColor: '#472b77', height: '1rem' }}
                  ></Box>
                </Link>
              </Grid>
              <Grid item xs={3.75} sx={{ border: '1px solid black' }}>
                <Link href="/last-five-days">
                  <Box
                    sx={{ backgroundColor: '#472b77', height: '1rem' }}
                  ></Box>
                </Link>
              </Grid>
              <Grid item xs={3.75} sx={{ border: '1px solid black' }}>
                <Box sx={{ backgroundColor: '#472b77', height: '1rem' }}></Box>
              </Grid>
            </Grid>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Assessment
