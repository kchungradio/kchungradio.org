const radiocultJsonFetcher = (suffix = '') => {
  const url = `https://api.radiocult.fm/api/station/kchung-radio-01e54a81${suffix}`

  return fetch(url, {
    headers: { 'x-api-key': 'pk_2b3e0601b08845bd895ef1f5c8c19452' },
  }).then((res) => res.json())
}

export default radiocultJsonFetcher