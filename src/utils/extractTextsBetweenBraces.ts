export const extractTextsBetweenBraces = (string: string): string[] => {
  const regex = /\{([^}]+)\}/g
  const matches = string.match(regex)

  if (matches) return matches.map(match => match.slice(1, -1))

  return []
}
