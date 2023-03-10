import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import Seo from '../../components/seo'
import { IClinicFields } from '../../@types/generated/contentful'
import { Entry, EntryCollection } from 'contentful'
import { ParsedUrlQuery } from 'querystring'
import { client } from '../../lib/api'
import { GetStaticProps } from 'next'
import ContentfulRichText from '../../components/contentfulRichText'

interface IParams extends ParsedUrlQuery {
  clinicId: string
}

const Clinic = ({ clinic }: { clinic: Entry<IClinicFields> }) => {
  return (
    <div className={'container'}>
      <Seo seoMetadata={clinic?.fields?.seo}></Seo>

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
            maxWidth: 'lg',
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
              {clinic && clinic.fields ? (
                <Grid item width={'100%'}>
                  <Typography variant="h4" component={'div'}>
                    {clinic.fields.clinicName}
                  </Typography>
                  <ContentfulRichText
                    richText={clinic.fields.clinicAddressInformation}
                  />
                  <iframe
                    src={`https://maps.google.com/maps?q=${clinic.fields.clinicLocation?.lat},${clinic.fields.clinicLocation?.lon}&output=embed`}
                    width="100%"
                    height="450"
                    frameBorder="0"
                    style={{ border: '0' }}
                    allowFullScreen
                  ></iframe>
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

export const getStaticProps: GetStaticProps = async (context) => {
  const { clinicId } = context.params as IParams

  const data: EntryCollection<IClinicFields> = await client.getEntries({
    content_type: 'clinic',
    'fields.slug[in]': clinicId,
  })

  const clinic = data.items.length ? data.items[0] : undefined

  return {
    props: { clinic },
    revalidate: 10,
  }
}

export const getStaticPaths = async () => {
  const clinics: Entry<IClinicFields>[] = await client
    .getEntries({ content_type: 'clinic' })
    .then((response: EntryCollection<IClinicFields>) => response.items)

  const paths = clinics.map((clinic: Entry<IClinicFields>) => ({
    params: {
      clinicId: clinic.fields.slug,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export default Clinic
