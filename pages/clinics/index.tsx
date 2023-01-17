/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from '../../lib/api'

const Clinics = ({ data }: { data: any }) => {
  return (
    <section>
      <h1>Clinics</h1>
      <ul>
        {data.items.map((item: any) => {
          return <li key={item.sys.id}>{item.fields.clinicName}</li>
        })}
      </ul>
    </section>
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
