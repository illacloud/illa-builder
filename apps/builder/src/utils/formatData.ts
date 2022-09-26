export const formatDataAsObject = (data: Record<string, any>[]) => {
  if (!Array.isArray(data) || !data.length) return {}
  const result: Record<string, unknown[]> = {}
  data.forEach((d) => {
    Object.keys(d).map((key) => {
      const value = d[key]
      if (!Object.hasOwn(result, key)) {
        result[key] = []
      }
      result[key].push(value)
    })
  })
  return result
}

export const formatDataAsArray = (data: Record<string, unknown[]>) => {
  const keys = Object.keys(data || {})
  if (!keys.length) return []
  const result = []
  const firstKey = keys[0]

  for (let i = 0; i < data[firstKey].length; i++) {
    const currentObj = keys.reduce((pre, cur) => {
      if (data[cur][i] != undefined) {
        pre[cur] = data[cur][i]
      }
      return pre
    }, {} as Record<string, any>)
    result.push(currentObj)
  }
  return result
}
