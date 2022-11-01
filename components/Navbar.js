import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

function Navbar() {
  return (
    <>
      <div id="banner">
        <Link href="/">
          <a className="no-hover">
            <picture>
              <img
                src="/img/kchungblood.png"
                alt="KCHUNG logo"
                width="150"
                style={{ border: 0 }}
              />
            </picture>
          </a>
        </Link>
        <span>1630am chinatown los angeles</span>
      </div>
      <div id="nav">
        <div id="left">
          <NavLink href="/stream">stream</NavLink>
          <NavLink href="/schedule">schedule</NavLink>
          <NavLink href="/archive">archive</NavLink>
          <NavLink href="/participate">participate</NavLink>
          <NavLink href="/donate">donate</NavLink>
        </div>
        <div id="right">
          <NavLink href="/about">
            about
          </NavLink>
          <NavLink href="https://kchung.bigcartel.com" external last>
            store
          </NavLink>
          <NavLink href="https://www.moca.org/kchung-public" external last>
            kchung public
          </NavLink>
          <span>
            <NavLink href="https://www.facebook.com/kchungradio" external>
              <img src="/img/facebook.png" width="14em" />
            </NavLink>
            <NavLink href="https://www.twitter.com/kchungradio" external>
              <img src="/img/twitter.png" width="14em" />
            </NavLink>
            <NavLink href="https://www.instagram.com/kchungradio" external>
              <img src="/img/instagram.png" width="14em" />
            </NavLink>
          </span>
        </div>
      </div>
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
      {!last}
    </>
  )
}

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  external: PropTypes.bool,
  last: PropTypes.bool,
}

export default Navbar
