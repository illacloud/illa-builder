export function recursiveDelete(
  obj: Record<string, unknown>,
  ignoredKeys?: string[],
): Record<string, unknown> {
  const newObj: Record<string, unknown> = {}

  for (let key in obj) {
    if (!key.startsWith("$") && !ignoredKeys?.includes(key)) {
      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        newObj[key] = recursiveDelete(
          obj[key] as Record<string, unknown>,
          ignoredKeys,
        )
      } else {
        newObj[key] = obj[key]
      }
    }
  }

  return newObj
}
