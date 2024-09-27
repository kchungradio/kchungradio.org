import Link from 'next/link'

function ParticipatePage() {
  return (
    <div id="main">
      <h3>participate</h3>
      <p>anyone can be involved.</p>
      <p>KCHUNG is a community non-profit that runs on volunteers, member dues, donations, and grants. if you are interested in having a radio show or helping out around the station, please email <a href="mailto:generalmanager@kchungradio.org">generalmanager@kchungradio.org</a>. kchung dj dues are $12 a month and can be set up as a <Link href="/donate">recurring donation</Link> via paypal.</p>
      <br />
      <h3>where to send your music</h3>
      <p>send your cds, tapes, records, and wax cylinders to:</p>
      <blockquote>
        KCHUNG
        <br />
        p.o. box 862106
        <br />
        900 n alameda st
        <br />
        los angeles, ca 90012
      </blockquote>
      <p>
        or email digital submissions to{' '}
        <a href="mailto:music@kchungradio.org">music@kchungradio.org</a>.
      </p>
      <br />
      <h3>support</h3>
      <p>
        kchung radio relies on member dues, events, community support and
        contributions in order to survive. we are not for-profit and have no
        financial or institutional backers. if you would like to support kchung,
        here are some ways to help.
      </p>
      <ul>
        <li>join our staff!</li>
        <li>donate equipment!</li>
        <li>make a financial contribution!</li>
      </ul>
      <p>equipment wish list:</p>
      <ul>
        <li>turntable needles</li>
      </ul>
      <p>
        if you would like to become a kchung staff member or donate equipment,
        please email{' '}
        <a href="mailto:generalmanager@kchungradio.org">
          generalmanager@kchungradio.org
        </a>
        .
      </p>
    </div>
  )
}

export default ParticipatePage
