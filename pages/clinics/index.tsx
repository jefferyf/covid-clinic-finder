/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid } from '@mui/material'
import Link from 'next/link'
import Seo from '../../components/seo'
import { client } from '../../lib/api'

const Clinics = ({ data }: { data: any }) => {
  return (
    <div className={'container'}>
      <Seo seoMetadata={undefined}></Seo>

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
              <Grid item>
                <section>
                  <h1>Clinics</h1>
                  <ul>
                    {data.items.map((item: any) => {
                      return (
                        <li key={item.sys.id}>
                          <Link href={`/clinics/${item.fields.zipCodes[0]}`}>
                            {item.fields.clinicName}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export const getStaticProps = async () => {
  const data = await client.getEntries({ content_type: 'clinic' })
  if (!data.items.length) {
    throw new Error('This page does not exist.')
  }

  return {
    props: { data },
    revalidate: 10,
  }
}

export default Clinics
