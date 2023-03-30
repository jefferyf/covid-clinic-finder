import { Box, Button, Grid } from '@mui/material'
import ContentfulRichText from '../../components/contentfulRichText'
import Seo from '../../components/seo'
import { client } from '../../lib/api'
import { IoMdPin } from 'react-icons/io'
import { GetStaticProps } from 'next'
import React from 'react'
import { getDistance } from 'geolib'
import { ImMobile2 } from 'react-icons/im'
import { GeolibInputCoordinates } from 'geolib/es/types'
import {
  IClinicFields,
  IFoundLocationCopyFields,
  IGenericPageFields,
} from '../../@types/generated/contentful'
import { Entry, EntryCollection } from 'contentful'
import { useRouter } from 'next/router'
import { MdInfoOutline } from 'react-icons/md'

interface IProps {
  clinics: EntryCollection<IClinicFields>
  pageData: Entry<IGenericPageFields>
}

const Clinics = ({ clinics, pageData }: IProps) => {
  const router = useRouter()
  const { query } = router
  const [location, setLocation] = React.useState<GeolibInputCoordinates>()
  const [notFound, setNotFound] = React.useState(false)
  const [copy, setCopy] =
    React.useState<IFoundLocationCopyFields['copy']>(undefined)

  React.useEffect(() => {
    if ('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords
        setLocation({ latitude, longitude })
      })
    }
  }, [])

  React.useEffect(() => {
    const { zipcode } = query

    if (zipcode) {
      const allZipCodes = clinics.items
        .map((clinic) => clinic.fields.zipCodes)
        .filter((ary) => ary.includes(zipcode.toString()))

      if (!allZipCodes.length) {
        setNotFound(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  React.useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      const copyEntry: Entry<IFoundLocationCopyFields> = await client.getEntry(
        notFound ? '3eLu4ydbnFfxKrwsqNWjNW' : '1o0kRoTPcoxktV3tvgNrAN'
      )
      setCopy(copyEntry?.fields?.copy)
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error)
  }, [notFound])

  const distance = (clinicLocation: GeolibInputCoordinates) => {
    if (location) {
      try {
        const distance = location ? getDistance(location, clinicLocation) : 0

        return `${(distance * 0.000621371192).toFixed(1)} Miles`
      } catch (e) {
        console.warn(e)
      }
    } else {
      return null
    }
  }

  return (
    <div className={'container'}>
      <Seo seoMetadata={pageData?.fields?.seoMetadata}></Seo>
      <main className="main">
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
              maxWidth: 'sm',
              backgroundColor: '#5E3D94',
              borderRadius: '25px',
              padding: '2rem',
              margin: '0',
            }}
          >
            <Box width={'100%'}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                rowGap={4}
              >
                {notFound ? (
                  <Box>
                    <Box sx={{ padding: '1rem 0' }}>
                      <ContentfulRichText richText={copy} />
                    </Box>

                    <Button
                      variant="contained"
                      className={'assessmentStart'}
                      startIcon={<MdInfoOutline />}
                      href="https://covid19.ca.gov/treatment/#how-to-find-treatment"
                    >
                      Learn More
                    </Button>
                  </Box>
                ) : (
                  <Grid item>
                    {pageData ? (
                      <Box className="clinicInstructions">
                        <ContentfulRichText
                          richText={pageData?.fields?.contentBlock}
                        />
                      </Box>
                    ) : null}
                    <ul
                      style={{
                        listStyleType: 'none',
                        margin: '0',
                        padding: '0',
                        borderTop: '1px solid #B793F0',
                      }}
                    >
                      {clinics.items
                        .filter((item: Entry<IClinicFields>) => {
                          return query.zipcode
                            ? item.fields.zipCodes.includes(
                                query.zipcode.toString()
                              )
                            : true
                        })
                        .map((item: Entry<IClinicFields>) => {
                          return (
                            <li
                              key={item.sys.id}
                              data-zipcodes={`['${item.fields.zipCodes.join(
                                "','"
                              )}']`}
                              style={{
                                borderBottom: '1px solid #B793F0',
                                padding: '1.5rem 0',
                              }}
                            >
                              <Grid container>
                                <Grid item xs={8}>
                                  <p className="clinicName">
                                    {item.fields.clinicName}
                                  </p>
                                </Grid>
                                <Grid item xs={4}>
                                  <span
                                    className="clinicDistance"
                                    style={{ float: 'right' }}
                                  >
                                    {distance({
                                      latitude:
                                        item?.fields?.clinicLocation?.lat,
                                      longitude:
                                        item?.fields?.clinicLocation?.lon,
                                    })}
                                  </span>
                                </Grid>
                              </Grid>

                              <Box
                                sx={{ margin: '0.75rem 0', color: '#D0BCFF' }}
                              >
                                <ContentfulRichText
                                  richText={
                                    item.fields.clinicAddressInformation
                                  }
                                />
                              </Box>
                              <Button
                                variant="outlined"
                                size="small"
                                className="clinicDetails"
                                startIcon={<IoMdPin />}
                                href={`/clinics/${item.fields.slug}`}
                              >
                                Map
                              </Button>
                              {item.fields.phoneNumber ? (
                                <Button
                                  variant="outlined"
                                  size="small"
                                  className="clinicDetails"
                                  sx={{ marginLeft: '0.75rem' }}
                                  startIcon={<ImMobile2 />}
                                  href={`tel:${item.fields.phoneNumber}`}
                                >
                                  {item.fields.phoneNumber}
                                </Button>
                              ) : null}
                            </li>
                          )
                        })}
                    </ul>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData: Entry<IGenericPageFields> = await client.getEntry(
    '5HFnHDENvuG8EGiwTDUKdG'
  )

  const clinics: EntryCollection<IClinicFields> = await client.getEntries({
    content_type: 'clinic',
  })

  return {
    props: { clinics, pageData },
    revalidate: 10,
  }
}

export default Clinics
