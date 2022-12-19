export default async function jsonFetcher(...args) {
  const res = await fetch(...args)
  return res.json()
}
