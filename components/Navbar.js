import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

function Navbar() {
  return (
    <>
      <Link href="/">
        <a className="no-hover">
          <img src="/img/kchungblood.png" width="150" style={{ border: 0 }} />
        </a>
      </Link>
      <br />
      <br />
      <span>broadcasting on 1630 am, chinatown, los angeles</span>
      <br />
      <nav>
        <hr width="1038" color="white" />
        <NavLink href="/stream">live stream</NavLink>
        <NavLink href="/schedule">schedule</NavLink>
        <NavLink href="/archive">archive</NavLink>
        <NavLink href="/email">email</NavLink>
        <NavLink href="/mailinglist">mailing list</NavLink>
        <NavLink href="/participate">participate</NavLink>
        <NavLink href="/donate">donate</NavLink>
        <NavLink href="https://www.facebook.com/kchungradio" external>f</NavLink>
        <NavLink href="https://www.twitter.com/kchungradio" external>t</NavLink>
        <NavLink href="https://www.instagram.com/kchungradio" external>i</NavLink>
        <NavLink href="https://wiki.kchungradio.org" external>wiki</NavLink>
        <NavLink href="https://kchung.bigcartel.com" external last>store</NavLink>
        <br />
        <hr width="1038" color="white" />
      </nav>
      <br />
      <br />
    </>
  )
}

function NavLink({ href, children, external, last }) {
  let link
  if (external) {
    link = (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  } else {
    link = (
      <Link href={href}>
        <a>{children}</a>
      </Link>
    )
  }

  return (
    <>
      {link}
      {!last && <span style={{ margin: '0 8px' }}>|</span>}
    </>
  )
}

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  external: PropTypes.bool,
  last: PropTypes.bool
}

export default Navbar
