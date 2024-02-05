export async function fetchCalendar() {
  const res = await fetch('https://kchungradio-schedule-api.now.sh')
  const events = await res.json()
  return { events }
}
