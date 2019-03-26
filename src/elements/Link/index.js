// @flow
import React from 'react'
import type { Node } from 'react'
import { NavLink as InternalLink } from 'react-router-dom'
import MaterialLink from '@material-ui/core/Link'

import { isIE } from 'src/utility/browser/CompatFunctions'

type Props = {
  children: Node,
  style?: Object,
  url: string
}
export default class Link extends React.Component<Props> {

  render () {
    const { children, url, ...attrs } = this.props
    const styleOverride = { color: 'inherit', textDecoration: 'none' }

    return (
      url.startsWith('/') ? (
        <InternalLink exact to={url} {...attrs} style={styleOverride}>
          {children}
        </InternalLink>
      ) : (
        <MaterialLink
          href={url}
          rel='noopener'
          target={isIE ? '_self' : '_blank'}
          style={styleOverride}
          {...attrs}
        >
          {children}
        </MaterialLink>
      )
    )
  }
}
