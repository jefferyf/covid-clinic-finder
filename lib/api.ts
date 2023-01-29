// eslint-disable-next-line @typescript-eslint/no-var-requires
export const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
})

export const fetchGraphQL = async (
  query: string,
  variables: object,
  preview = false
) => {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query, variables }),
    }
  ).then((response) => response.json())
}

export const POST_GRAPHQL_GET_CLINCS_BY_ZIPCODE = `
query GetClinicsByZipCode($zipcode: [String]!) {
	clinicCollection(where: { zipCodes_contains_some: $zipcode }) {
		items {
			sys {
				id
			}
			clinicName
			clinicDetails {
				json
			}
			zipCodes
			clinicLocation {
				lat
				lon
			}
			seo {
				seoTitle
				description
				hidePageFromSearchEnginesNoindex
				excludeLinksFromSearchRankingsNofollow
				image {
					fileName
				}
			}
		}
	}
}`
