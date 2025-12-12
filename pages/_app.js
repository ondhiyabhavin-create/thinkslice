import '../styles/globals.css'
import { useEffect } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove server-injected styles if any (static export safe)
  }, [])

  return (
    <>
      <Head>
        <title>ThinSLICE — Thin Section Library</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content="ThinSLICE - Digital thin-section repository with high-resolution imaging" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-primary to-secondary text-white flex flex-col" style={{ overflow: 'visible' }}>
        <Header />
        <main className="flex-1 w-full" style={{ overflow: 'visible' }}>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  )
}
