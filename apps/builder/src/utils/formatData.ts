export const formatDataAsArray = (data: Record<string, any>[]) => {
  if (!data.length) return []
  const result: Record<string, unknown[]> = {}
  data.forEach(d => {
    Object.keys(d).map(key => {
      const value = d[key]
      if (!Object.hasOwn(result, key)) {
        result[key] = []
      }
      result[key].push(value)
    })
  })
  return result
}
