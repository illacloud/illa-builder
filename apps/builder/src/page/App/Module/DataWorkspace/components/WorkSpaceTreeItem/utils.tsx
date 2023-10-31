import { MAX_LEN_WITH_SNIPPETS } from "@/components/CodeEditor"

export const renderJsonValue = (value: unknown) => {
  const type = typeof value
  switch (type) {
    case "string":
      return `"${
        (value as string).length > 1024
          ? (value as string).slice(0, MAX_LEN_WITH_SNIPPETS) + "..."
          : value
      }"`
    default:
      return `${value}`
  }
}
