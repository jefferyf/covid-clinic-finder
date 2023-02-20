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
  IGenericPageFields,
} from '../../@types/generated/contentful'
import { Entry, EntryCollection } from 'contentful'

interface IProps {
  clinics: EntryCollection<IClinicFields>
  pageData: Entry<IGenericPageFields>
}

const Clinics = ({ clinics, pageData }: IProps) => {
  const [location, setLocation] = React.useState<GeolibInputCoordinates>()

  React.useEffect(() => {
    if ('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords
        setLocation({ latitude, longitude })
      })
    }
  }, [])

  const distance = (clinicLocation: GeolibInputCoordinates) => {
    try {
      const distance = location ? getDistance(location, clinicLocation) : 0

      return `${(distance * 0.000621371192).toFixed(1)} Miles`
    } catch (e) {
      console.warn(e)
    }
  }

  return (
    <div className={'container'}>
      <Seo seoMetadata={pageData?.fields?.seoMetadata}></Seo>
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
          <Box width={'100%'}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              rowGap={4}
            >
              <Grid item>
                {pageData ? (
                  <ContentfulRichText
                    richText={pageData?.fields?.contentBlock}
                  ></ContentfulRichText>
                ) : null}
                <ul
                  style={{ listStyleType: 'none', margin: '0', padding: '0' }}
                >
                  {clinics.items.map((item: Entry<IClinicFields>) => {
                    return (
                      <li
                        key={item.sys.id}
                        style={{ borderBottom: '1px solid #D0BCFF' }}
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
                                latitude: item?.fields?.clinicLocation?.lat,
                                longitude: item?.fields?.clinicLocation?.lon,
                              })}
                            </span>
                          </Grid>
                        </Grid>

                        <Box>
                          <ContentfulRichText
                            richText={item.fields.clinicAddressInformation}
                          />
                        </Box>
                        <Button
                          variant="outlined"
                          size="small"
                          className="clinicDetails"
                          startIcon={<IoMdPin />}
                          href={`/clinics/${item.fields.zipCodes[0]}`}
                        >
                          Map
                        </Button>
                        {item.fields.phoneNumber ? (
                          <Button
                            variant="outlined"
                            size="small"
                            className="clinicDetails"
                            startIcon={<ImMobile2 />}
                          >
                            {item.fields.phoneNumber}
                          </Button>
                        ) : null}
                      </li>
                    )
                  })}
                </ul>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
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
