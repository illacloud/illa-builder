import { isString } from "@illa-design/react"

const markCodeBlocks = (markdownText: string) => {
  const codeBlockRegex = /```[\s\S]*?```/g
  const placeholders: string[] = []
  const placeholderPrefix = "__CODEBLOCK__"
  // handler "---"
  let tempText = markdownText.replaceAll(/(^---\r?\n?)/gm, "\n---\n")
  tempText = tempText.replace(codeBlockRegex, (match) => {
    const placeholder = `${placeholderPrefix}${placeholders.length}`
    placeholders.push(match)
    return placeholder
  })
  return { textWithoutCodeBlocks: tempText, placeholders }
}

const convertTablesWithoutCodeBlocks = (
  tempText: string,
  isOwnMessage?: boolean,
) => {
  let res = tempText

  if (isOwnMessage) {
    const startRex = /(^\n?\|)|((\n\n)(.*)\|)/g
    const endRex = /(\|\n?$)|(\|\n\n)/g
    if (startRex.test(tempText) && endRex.test(tempText)) {
      res = tempText.replace(startRex, (match) => {
        return `\n\`\`\`markdown\n${match.trim()}`
      })
      res = res.replace(endRex, (match) => {
        return `${match.trim()}\n\`\`\`\n`
      })
    }
  } else {
    const startRex = /(^\n?\|)|((\n\n)(.*)\|)/
    const endRex = /(\|\n?$)|(\|\n\n)/
    if (startRex.test(tempText) && endRex.test(tempText)) {
      res = tempText.replace(startRex, (match) => {
        return `\n\`\`\`markdown\n${match.trim()}`
      })
      res = res.replace(endRex, (match) => {
        return `${match.trim()}\n\`\`\`\n`
      })
    } else if (startRex.test(tempText)) {
      res = tempText.replace(startRex, (match) => {
        return `\n\`\`\`markdown\n${match.trim()}`
      })
    }
  }
  return res
}

const restoreCodeBlocks = (
  textWithPlaceholders: string,
  placeholders: string[],
) => {
  placeholders.forEach((placeholderContent, index) => {
    const placeholder = `__CODEBLOCK__${index}`
    textWithPlaceholders = textWithPlaceholders.replace(
      placeholder,
      () => placeholderContent,
    )
  })

  return textWithPlaceholders
}

export const convertMarkdownTables = (
  markdownText: string,
  isOwnMessage?: boolean,
) => {
  const { textWithoutCodeBlocks, placeholders } = markCodeBlocks(markdownText)
  let convertedText = convertTablesWithoutCodeBlocks(
    textWithoutCodeBlocks,
    isOwnMessage,
  )
  convertedText = restoreCodeBlocks(convertedText, placeholders)
  return convertedText
}

export const getTextValue = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value.join("\n")
  } else if (isString(value)) {
    return value
  } else {
    return ""
  }
}

export const handleMarkdownLine = (text: string) => {
  return text.replace(/((^\n?---)(\n|$))/gm, "\n---\n")
}

export const handleMarkdownCode = (
  text: string,
  isOwnMessage?: boolean,
): string => {
  let res = text
  if (isOwnMessage) {
    const startRex =
      /(^\n?```markdown)|(^\n?```md)|(\n*```markdown)|(\n*```md)/gim
    const endRex = /(```\n?$)|(```\n\n)/gm
    if (startRex.test(res) && endRex.test(res)) {
      res = text.replace(startRex, () => {
        return `\n\n`
      })
      res = res.replace(endRex, () => {
        return `\n\n`
      })
    }
  } else {
    const startRex =
      /(^\n?```markdown)|(^\n?```md)|((\n\n)(.*)```markdown) | ((\n\n)(.*)```md)/im
    const endRex = /(```\n?$)|(```\n\n)/m
    if (startRex.test(res) && endRex.test(res)) {
      res = res.replace(startRex, () => {
        return `\n\n`
      })
      res = res.replace(endRex, () => {
        return `\n\n`
      })
    } else if (startRex.test(res)) {
      res = res.replace(startRex, () => {
        return `\n\n`
      })
    }
  }
  return res
}
export const handleParseText = (text: string, isOwnMessage?: boolean) => {
  let res = text
  res = handleMarkdownLine(text)
  res = handleMarkdownCode(res, isOwnMessage)
  return res
}
