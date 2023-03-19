/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { SearchContext } from '../context/searchContext'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Head from 'next/head'
import { Button, Typography } from '@mui/material'
import { AiOutlineCheck } from 'react-icons/ai'
import { useRouter } from 'next/router'

const Assessment = () => {
  // @ts-ignore
  const { storedValue, setStoredValue } = React.useContext(SearchContext)
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setStoredValue({
      ...storedValue,
      // @ts-ignore
      positive: e.target.innerText === 'Yes',
    })
    router.push('/last-five-days')
  }

  return (
    <div className={'container'}>
      <main className="main">
        <Head>
          <title>COVID-19 Assessment | Are you feeling sick?</title>
          <meta
            name="description"
            content="COVID-19 Assessment | Are you feeling sick?"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Grid
          container
          alignItems="start"
          justifyContent="center"
          style={{ minHeight: '75vh', marginTop: '5rem' }}
        >
          <Grid
            item
            sx={{
              width: '100%',
              maxWidth: 'md',
              backgroundColor: '#5E3D94',
              borderRadius: '25px',
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
                  <Typography variant="h4" component="div">
                    Are you feeling sick?
                  </Typography>
                </Grid>
                <Grid item sx={{ paddingBottom: '4rem' }}>
                  <Button
                    variant="contained"
                    className={'assessmentStart'}
                    onClick={handleClick}
                    startIcon={
                      storedValue?.positive ? <AiOutlineCheck /> : null
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
                      storedValue?.positive === false ? (
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

export default Assessment
