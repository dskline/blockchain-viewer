
export function convertUnixToDateTime (unixTimestamp) {
  const date = new Date(1000 * unixTimestamp)
  return date.toLocaleDateString() + ' (' + date.toLocaleTimeString() + ')'
}
