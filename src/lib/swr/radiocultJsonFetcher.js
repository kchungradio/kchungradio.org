  const radiocultJsonFetcher = () =>
    fetch('https://api.radiocult.fm/api/station/kchung-radio-01e54a81/schedule/live', {
      headers: { 'x-api-key': 'pk_2b3e0601b08845bd895ef1f5c8c19452' },
    }).then((res) => res.json())