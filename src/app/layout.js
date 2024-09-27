import dynamic from 'next/dynamic'
import { config } from '@fortawesome/fontawesome-svg-core'

import { PostHogProvider } from './providers'
import Navbar from '../components/Navbar'
import Stream from '../components/Stream'

import '@fortawesome/fontawesome-svg-core/styles.css'

import '../css/style.css'

config.autoAddCss = false

export const metadata = {
  title: 'KCHUNG Radio 1630AM',
}

const PostHogPageView = dynamic(
  () => import('../components/PostHog/PageView'),
  {
    ssr: false,
  },
)

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <PostHogProvider>
        <body>
          <Navbar />
          <Stream />
          <PostHogPageView />
          {children}
        </body>
      </PostHogProvider>
    </html>
  )
}
