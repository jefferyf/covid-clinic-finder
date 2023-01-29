/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Head from 'next/head'
import { Card, CardContent, Typography } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'

import {
  client,
  fetchGraphQL,
  POST_GRAPHQL_GET_CLINCS_BY_ZIPCODE,
} from '../../lib/api'
import Map from '../../components/map/Map'
import ContentfulRichText from '../../components/contentfulRichText'

const Clinic = ({ clinic }: { clinic: any }) => {
  return (
    <div className={'container'}>
      <Head>
        <title>
          {clinic?.seo?.seoTitle ??
            `Nuna Covid Assessment - ${clinic?.clinicName ?? 'Clinic'}`}
        </title>
        <meta name="description" content={clinic?.seo?.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={'main'}>
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

            <Card
              className={'assessmentCard'}
              sx={{ backgroundColor: '#472b77', color: 'white' }}
            >
              {clinic ? (
                <CardContent>
                  <Typography variant="h3" component={'div'}>
                    Thank You!
                  </Typography>
                  <Typography variant="body1">
                    Here is the clinic for your zip code.
                  </Typography>

                  {/* <Grid
                  container
                  alignContent={'center'}
                  justifyContent={'center'}
                >
                  <Grid item xs={6}></Grid>
                  <Grid item xs={6}>
                    <div style={{ width: '100%', height: '400px' }}>
                      <Map
                        location={{
                          lat: clinic.clinicLocation?.lat,
                          lng: clinic.clinicLocation?.lon,
                          address: clinic.clinicName,
                        }}
                        zoomLevel={10}
                      />
                    </div>
                  </Grid>
                </Grid> */}

                  <ContentfulRichText richText={clinic.clinicDetails.json} />
                  <Map
                    location={{
                      lat: clinic.clinicLocation?.lat,
                      lng: clinic.clinicLocation?.lon,
                    }}
                    zoomLevel={12}
                    name={clinic.clinicName}
                  />
                </CardContent>
              ) : (
                <CardContent>
                  <Typography variant="h3" component={'div'}>
                    Thank You!
                  </Typography>
                  <Typography variant="body1">
                    We Could not find a clinic for this zip code. Please call us
                    at ....
                  </Typography>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </main>
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
