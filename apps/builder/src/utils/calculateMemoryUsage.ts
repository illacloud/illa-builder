export const LIMIT_MEMORY = 10 * 1024 * 1024 // 1MB = 1024 * 1024 bytes
export const estimateMemoryUsage = (data: unknown): number => {
  const type = typeof data

  switch (type) {
    case "number":
      return 8 // 8 bytes for a JavaScript number
    case "string":
      return (data as string).length * 2 // 2 bytes per character in a JavaScript string
    case "boolean":
      return 4 // 4 bytes for a JavaScript boolean
    case "undefined":
      return 0 // undefined doesn't occupy memory
    case "object":
      if (data === null) {
        return 0 // null doesn't occupy memory
      } else if (Array.isArray(data)) {
        let size = 0
        for (let i = 0; i < (data as unknown[]).length; i++) {
          size += estimateMemoryUsage((data as unknown[])[i])
        }
        return size
      } else {
        let size = 0
        for (const key in data as Record<string, unknown>) {
          if ((data as Record<string, unknown>).hasOwnProperty(key)) {
            size += estimateMemoryUsage((data as Record<string, unknown>)[key])
          }
        }
        return size
      }
    default:
      return 0
  }
}
