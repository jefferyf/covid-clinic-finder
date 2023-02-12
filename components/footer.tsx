import { Box, Container, Typography } from '@mui/material'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#402767',
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }}
    >
      <Container maxWidth="lg" style={{ backgroundColor: '#402767' }}>
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: 'center',
            display: 'flex',
            m: 2,
          }}
        >
          <Typography variant="caption" color="#D0BCFF">
            Copyright &copy;{new Date().getFullYear()} |{' '}
            <Link href={'privacyPolicy'} style={{ color: 'white' }}>
              Privacy Policy
            </Link>
          </Typography>
        </Box>
      </Container>
    </footer>
  )
}

export default Footer
