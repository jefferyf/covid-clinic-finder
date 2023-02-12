/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Box, Grid, Typography } from '@mui/material'

import {
  client,
  fetchGraphQL,
  POST_GRAPHQL_GET_CLINCS_BY_ZIPCODE,
} from '../../lib/api'
import Map from '../../components/map/Map'
import Seo from '../../components/seo'

const Clinic = ({ clinic }: { clinic: any }) => {
  return (
    <div className={'container'}>
      <Seo seoMetadata={clinic?.seo}></Seo>

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
            padding: '2rem',
          }}
        >
          <Box>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              rowGap={4}
            >
              {clinic ? (
                <Grid item width={'100%'}>
                  <Typography variant="h3" component={'div'}>
                    Thank You!
                  </Typography>
                  <Typography variant="body1">
                    Here is the clinic for your zip code.
                  </Typography>
                  <Map
                    location={{
                      lat: clinic.clinicLocation?.lat,
                      lng: clinic.clinicLocation?.lon,
                    }}
                    zoomLevel={12}
                    name={clinic.clinicName}
                  />
                </Grid>
              ) : (
                <Grid item>
                  <Typography variant="h3" component={'div'}>
                    Thank You!
                  </Typography>
                  <Typography variant="body1">
                    We Could not find a clinic for this zip code. Please call us
                    at ....
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

// @ts-ignore
export const getStaticProps = async ({ params: { clinicId } }) => {
  try {
    const response = await fetchGraphQL(POST_GRAPHQL_GET_CLINCS_BY_ZIPCODE, {
      zipcode: clinicId,
    })

    return {
      props: {
        clinic: response.data.clinicCollection.items[0] ?? null,
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

export const getStaticPaths = async () => {
  const clinics = await client
    .getEntries({ content_type: 'clinic' })
    .then((response: any) => response.items)

  // const paths = clinics.map((clinic: any) => ({
  //   params: {
  //     clinicId: clinic.sys.id,
  //   },
  // }))

  const clinicZipCodes = clinics
    .map(function (clinic: any) {
      return clinic.fields.zipCodes.map(function (zipCode: string) {
        return zipCode
      })
    })
    .flat()

  const paths = clinicZipCodes.map((zipCode: string) => ({
    params: {
      clinicId: zipCode,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export default Clinic
