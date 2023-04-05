import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SearchProvider from '../context/searchContext'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-384JGLD3CL"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-384JGLD3CL', {
          page_path: window.location.pathname,
        });`,
        }}
      />
      <SearchProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </SearchProvider>
    </>
  )
}
