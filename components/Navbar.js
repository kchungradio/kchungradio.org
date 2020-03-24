import React from 'react'

const links = [
  {
    title: 'live stream',
    href: '/stream'
  },
  {
    title: 'schedule',
    href: '/schedule'
  },
  {
    title: 'archive',
    href: '/archive'
  },
  {
    title: 'email',
    href: 'mailto:contact@kchungradio.org'
  },
  {
    title: 'mailing list',
    href: '/mailinglist'
  },
  {
    title: 'participate',
    href: '/participate'
  },
  {
    title: 'donate',
    href: '/donate'
  },
  {
    title: 'f',
    href: 'https://www.facebook.com/kchungradio'
  },
  {
    title: 't',
    href: 'https://www.twitter.com/kchungradio'
  },
  {
    title: 'i',
    href: 'https://www.instagram.com/kchungradio'
  },
  {
    title: 'wiki',
    href: 'https://wiki.kchungradio.org'
  },
  {
    title: 'store',
    href: 'https://kchung.bigcartel.com'
  }
]

const Navbar = () => (
  <>
    <a href="/" className="no-hover">
      <img src="/img/kchungblood.png" width="150" style={{ border: 0 }} />
    </a>
    <br />
    <br />
    <span>broadcasting on 1630 am, chinatown, los angeles</span>
    <br />
    <nav>
      <hr width="1038" color="white" />
      {links.map(({ href, title }, idx) => {
        const last = links.length === idx + 1
        return (
          <>
            <a href={href}>{title}</a>
            {!last && <span style={{ margin: '0 8px' }}>|</span>}
          </>
        )
      })}
      <br />
      <hr width="1038" color="white" />
    </nav>
    <br />
    <br />
  </>
)

export default Navbar
