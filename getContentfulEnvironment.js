/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const contentfulManagement = require('contentful-management')

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken:
      process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN ??
      'no-token',
  })

  return contentfulClient
    .getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? 'no-spaceid')
    .then((space) =>
      space.getEnvironment(
        process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT ?? 'master'
      )
    )
}
