export function getItem(key) {
  const valueString = localStorage.getItem(key)
  let value = null
  try {
    value = JSON.parse(valueString)
    // eslint-disable-next-line no-empty
  } catch (ignored) {}
  return value
}

export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeItem(key) {
  localStorage.removeItem(key)
}

export const TOKEN_EXPIRE_INFO = 'TOKEN.EXPIRE.INFO'
