/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react'
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarFixedAdjust,
} from 'rmwc'
import '@material/top-app-bar/dist/mdc.top-app-bar.css'
import '@material/icon-button/dist/mdc.icon-button.css'
import '@material/ripple/dist/mdc.ripple.css'
import '@rmwc/icon/icon.css'
import '@material/drawer/dist/mdc.drawer.css'
import Link from 'next/link'

const Navbar = () => {
  return (
    <>
      <TopAppBar
        fixed
        style={{
          backgroundColor: '#472B74',
          padding: '1rem',
          boxShadow: ' 0px 4px 30px rgba(0, 0, 0, 0.25)',
        }}
      >
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <Link href="/">
              <img src="/CDPH Loog.png" alt="California Public Health Logo" />
            </Link>
          </TopAppBarSection>
          <TopAppBarSection alignEnd>
            <img src="/beatit.png" alt="Test It logo" />
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
    </>
  )
}

export default Navbar
