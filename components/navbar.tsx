/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react'
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarFixedAdjust,
  TopAppBarNavigationIcon,
  TopAppBarActionItem,
  // Drawer,
  // DrawerContent,
  // DrawerHeader,
  // DrawerSubtitle,
  // DrawerTitle,
  // List,
  // ListItem,
} from 'rmwc'
import '@material/top-app-bar/dist/mdc.top-app-bar.css'
import '@material/icon-button/dist/mdc.icon-button.css'
import '@material/ripple/dist/mdc.ripple.css'
import '@rmwc/icon/icon.css'
import '@material/drawer/dist/mdc.drawer.css'

const Navbar = () => {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setOpen(open)
    }

  return (
    <>
      <TopAppBar fixed>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarNavigationIcon
              icon="menu"
              onClick={toggleDrawer(!open)}
            />
            <TopAppBarTitle>NUNA Clinic Locator</TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd>
            <TopAppBarActionItem icon="favorite" />
            <TopAppBarActionItem icon="star" />
            <TopAppBarActionItem icon="mood" />
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />

      {/* <Drawer dismissible open={open} onClose={toggleDrawer(false)}>
        <DrawerHeader>
          <DrawerTitle>DrawerHeader</DrawerTitle>
          <DrawerSubtitle>Subtitle</DrawerSubtitle>
        </DrawerHeader>
        <DrawerContent
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem>
              <a href="/">Home</a>
            </ListItem>
            <ListItem>
              <a href="/assessment">Assessment</a>
            </ListItem>
            <ListItem>
              <a href="/contact">Contact Us</a>
            </ListItem>
          </List>
        </DrawerContent>
      </Drawer> */}
    </>
  )
}

export default Navbar
