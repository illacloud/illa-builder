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
