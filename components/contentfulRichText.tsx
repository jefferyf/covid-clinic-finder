/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS, INLINES, Inline } from '@contentful/rich-text-types'

const defaultInline = (type, node) => {
  return `type: ${node.nodeType} id: ${node.data.target.sys.id}`
}

const options = {
  renderMark: {
    [MARKS.BOLD]: (text, key) => <strong key={key}>{text}</strong>,
    [MARKS.ITALIC]: (text, key) => <em key={key}>{text}</em>,
    [MARKS.UNDERLINE]: (text, key) => <u key={key}>{text}</u>,
    [MARKS.CODE]: (text, key) => <code key={key}>{text}</code>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p className="p-2">{children}</p>,
    [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
    [BLOCKS.HEADING_2]: (node, children) => <h2>{children}</h2>,
    [BLOCKS.HEADING_3]: (node, children) => <h3>{children}</h3>,
    [BLOCKS.HEADING_4]: (node, children) => <h4>{children}</h4>,
    [BLOCKS.HEADING_5]: (node, children) => <h5>{children}</h5>,
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
  },
}

interface IProps {
  richText: any
}

const ContentfulRichText = ({ richText }: IProps) => {
  return <>{documentToReactComponents(richText, options)}</>
}

export default ContentfulRichText
