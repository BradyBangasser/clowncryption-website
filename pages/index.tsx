import { useEffect } from 'react'
import Layout from '../components/layout'

export default function Home() {
  useEffect(() => window.location.replace("/try-it-out"))
  return (
    <Layout>
      <p>YOU WILL BE REDIRECTED</p>
    </Layout>
  )
}
