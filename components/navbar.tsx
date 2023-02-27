/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import { MdMenu } from 'react-icons/md'
import { client } from '../lib/api'
import { EntryCollection } from 'contentful'
import { IGenericPageFields } from '../@types/generated/contentful'
import { Button, MenuItem } from '@mui/material'
import Link from 'next/link'

// const pages = ['Products', 'Pricing', 'Blog']

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [pages, setPages] = React.useState<
    EntryCollection<IGenericPageFields> | undefined
  >(undefined)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    // @ts-ignore
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  React.useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      const pages: EntryCollection<IGenericPageFields> =
        await client.getEntries({
          content_type: 'genericPage',
          'fields.slug[ne]': 'clinics/index',
        })

      setPages(pages)
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error)
  }, [])

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#472B74',
        boxShadow: ' 0px 4px 30px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <img src="/Logo.png" alt="Test It logo" />
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages
                ? pages.items.map((page) => (
                    <Button
                      key={page.sys.id}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                      href={`/${page.fields.slug}`}
                    >
                      {page.fields.pageTitle}
                    </Button>
                  ))
                : null}
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MdMenu />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages
                  ? pages.items.map((page) => (
                      <MenuItem key={page.sys.id} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">
                          <Link href={`/${page.fields.slug}`}>
                            {page.fields.pageTitle}
                          </Link>
                        </Typography>
                      </MenuItem>
                    ))
                  : null}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar
