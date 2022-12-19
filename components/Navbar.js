import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Image from 'next/image'

function Navbar() {
  return (
    <>
      <div id="banner">
        <Link href="/stream">
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
          <NavLink href="/about">about</NavLink>
          <NavLink href="https://kchung.bigcartel.com" external>
            store
          </NavLink>
          <NavLink href="https://www.moca.org/kchung-public" external>
            kchung public
          </NavLink>
          <span>
            <NavLink href="https://www.facebook.com/kchungradio" external>
              <Image
                src="/img/facebook.png"
                width={14}
                height={14}
                alt="facebook"
              />
            </NavLink>
            <NavLink href="https://www.twitter.com/kchungradio" external>
              <Image
                src="/img/twitter.png"
                width={14}
                height={14}
                alt="twitter"
              />
            </NavLink>
            <NavLink href="https://www.instagram.com/kchungradio" external>
              <Image
                src="/img/instagram.png"
                width={14}
                height={14}
                alt="instagram"
              />
            </NavLink>
          </span>
        </div>
      </div>
    </>
  )
}

function NavLink({ href, children, external }) {
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  )
}

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  external: PropTypes.bool,
}

export default Navbar
