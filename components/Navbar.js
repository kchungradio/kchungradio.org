import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

function Navbar() {
  return (
    <>
      <Link href="/" className="no-hover">
        <img src="/img/kchungblood.png" width="150" style={{ border: 0 }} />
      </Link>
      <br />
      <br />
      <span>broadcasting on 1630 am, chinatown, los angeles</span>
      <br />
      <nav>
        <hr width="1038" color="white" />
        <NavLink href="/stream" title="live stream" />
        <NavLink href="/schedule" title="schedule" />
        <NavLink href="/archive" title="archive" />
        <NavLink href="/email" title="email" />
        <NavLink href="/mailinglist" title="mailing list" />
        <NavLink href="/participate" title="participate" />
        <NavLink href="/donate" title="donate" />
        <NavLink href="https://www.facebook.com/kchungradio" title="f" />
        <NavLink href="https://www.twitter.com/kchungradio" title="t" />
        <NavLink href="https://www.instagram.com/kchungradio" title="i" />
        <NavLink href="https://wiki.kchungradio.org" title="wiki" />
        <NavLink href="https://kchung.bigcartel.com" title="store" last />
        <br />
        <hr width="1038" color="white" />
      </nav>
      <br />
      <br />
    </>
  )
}

function NavLink({ href, title, last }) {
  return (
    <>
      <Link href={href}>{title}</Link>
      {!last && <span style={{ margin: '0 8px' }}>|</span>}
    </>
  )
}

NavLink.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
  last: PropTypes.bool
}

export default Navbar
