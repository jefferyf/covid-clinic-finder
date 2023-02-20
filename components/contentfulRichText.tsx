/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import React from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS, INLINES, Inline } from '@contentful/rich-text-types'
import { Typography } from '@mui/material'

const defaultInline = (type, node) => {
  return `type: ${node.nodeType} id: ${node.data.target.sys.id}`
}

const Text = ({ children }) => (
  <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
    {children}
  </Typography>
)

const options = {
  renderMark: {
    [MARKS.BOLD]: (text, key) => <strong key={key}>{text}</strong>,
    [MARKS.ITALIC]: (text, key) => <em key={key}>{text}</em>,
    [MARKS.UNDERLINE]: (text, key) => <u key={key}>{text}</u>,
    [MARKS.CODE]: (text, key) => <code key={key}>{text}</code>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.HEADING_1]: (node, children) => (
      <Typography variant="h1" component="div">
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <Typography variant="h2" component="div">
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <Typography variant="h3" component="div">
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
      <Typography variant="h4" component="div">
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_5]: (node, children) => (
      <Typography variant="h5" component="div">
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_6]: (node, children) => <h6>{children}</h6>,
    [BLOCKS.EMBEDDED_ENTRY]: (node, children) => <div>{children}</div>,
    [BLOCKS.UL_LIST]: (node, children) => <ul>{children}</ul>,
    [BLOCKS.OL_LIST]: (node, children) => <ol>{children}</ol>,
    [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (node, children) => <blockquote>{children}</blockquote>,
    [BLOCKS.HR]: () => <hr />,
    [INLINES.ASSET_HYPERLINK]: (node) =>
      defaultInline(INLINES.ASSET_HYPERLINK, node as Inline),
    [INLINES.ENTRY_HYPERLINK]: (node) =>
      defaultInline(INLINES.ENTRY_HYPERLINK, node as Inline),
    [INLINES.EMBEDDED_ENTRY]: (node) =>
      defaultInline(INLINES.EMBEDDED_ENTRY, node as Inline),
    [INLINES.HYPERLINK]: (node, children) => (
      <a href={node.data.uri}>{children}</a>
    ),
    [INLINES.HYPERLINK]: (node, children) => {
      // Only process youtube links
      if (node.data.uri.includes('youtube.com')) {
        // Extract videoId from the URL
        const match =
          /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/.exec(
            node.data.uri
          )
        const videoId = match && match[7].length === 11 ? match[7] : null
        return videoId ? (
          <section className="video-container">
            <iframe
              className="video"
              width={'664'}
              height={'375'}
              title={`https://youtube.com/embed/${videoId}`}
              src={`https://youtube.com/embed/${videoId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              frameBorder={0}
            />
          </section>
        ) : null
      } else {
        return <a href={node.data.uri}>{children}</a>
      }
    },
  },
}

interface IProps {
  richText: any
}

const ContentfulRichText = ({ richText }: IProps) => {
  return <>{documentToReactComponents(richText, options)}</>
}

export default ContentfulRichText
