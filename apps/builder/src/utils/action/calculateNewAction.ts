export const updateActionContent = <T extends Record<string, unknown>>(
  obj: T,
  path: string[],
  value: string | boolean,
) => {
  if (path.length === 1) {
    const key = path[0]
    return { ...obj, [key]: value } as T
  }
  const [currentKey, ...restKeys] = path
  const currentObj = obj[currentKey] as Record<string, unknown>
  const updatedObj = updateActionContent(currentObj, restKeys, value) as T

  return { ...obj, [currentKey]: updatedObj } as T
}
