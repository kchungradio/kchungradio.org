export function slugify(text) {
  return text.toString().trim().toLowerCase().replace(/\s/g, '-')
}

export function unslugify(text) {
  return text.split('-').join(' ')
}
