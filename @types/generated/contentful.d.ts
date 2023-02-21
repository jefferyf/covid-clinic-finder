// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from 'contentful'
import { Document } from '@contentful/rich-text-types'

export interface IClinicFields {
  /** Clinic Name */
  clinicName: string

  /** Slug */
  slug: string

  /** Phone Number */
  phoneNumber: string

  /** Clinic Details */
  clinicDetails?: Document | undefined

  /** Clinic Location */
  clinicLocation: { lat: number; lon: number }

  /** Clinic Address Information */
  clinicAddressInformation?: Document | undefined

  /** Zip Codes */
  zipCodes: string[]

  /** seo */
  seo: ISeoMetaTags
}

export interface IClinic extends Entry<IClinicFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'clinic'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IGenericPageFields {
  /** Title */
  pageTitle: string

  /** Slug */
  slug?: string | undefined

  /** Seo Metadata */
  seoMetadata: ISeoMetaTags

  /** Content Block */
  contentBlock: Document
}

/** This content type will allow admins to create generic pages. */

export interface IGenericPage extends Entry<IGenericPageFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'genericPage'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IHomePageFields {
  /** SEO Metadata */
  seoMetadata: ISeoMetaTags

  /** Headline */
  headline?: string | undefined

  /** Home Page Copy */
  homePageCopy?: Document | undefined

  /** HeadlineCopy */
  headlineCopy?: Document | undefined
}

export interface IHomePage extends Entry<IHomePageFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'homePage'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ISeoMetaTagsFields {
  /** Internal Name */
  internalName: string

  /** SEO title */
  seoTitle?: string | undefined

  /** Description */
  description?: string | undefined

  /** Image */
  image?: Asset | undefined

  /** Hide page from search engines (noindex) */
  hidePageFromSearchEnginesNoindex: boolean

  /** Exclude links from search rankings (nofollow) */
  excludeLinksFromSearchRankingsNofollow: boolean
}

/** Open Graph (OG) meta tags for optimizing SEO visibility */

export interface ISeoMetaTags extends Entry<ISeoMetaTagsFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'seoMetaTags'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export type CONTENT_TYPE = 'clinic' | 'genericPage' | 'homePage' | 'seoMetaTags'

export type IEntry = IClinic | IGenericPage | IHomePage | ISeoMetaTags

export type LOCALE_CODE = 'en-US'

export type CONTENTFUL_DEFAULT_LOCALE_CODE = 'en-US'
