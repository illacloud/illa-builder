class FormatTable {
  private hasStartTable: boolean = false
  private markCodeBlocks(markdownText: string) {
    const codeBlockRegex = /```[\s\S]*?```/g
    const placeholders: string[] = []
    const placeholderPrefix = "__CODEBLOCK__"
    // handler ---
    let tempText = markdownText.replaceAll(/(^---\r?\n?)/gm, "\n---\n")
    tempText = tempText.replace(codeBlockRegex, (match) => {
      const placeholder = `${placeholderPrefix}${placeholders.length}`
      placeholders.push(match)
      return placeholder
    })
    return { textWithoutCodeBlocks: tempText, placeholders }
  }

  private convertTablesWithoutCodeBlocks(tempText: string) {
    let res = tempText
    let startRex = /(^\n?\|)|((\n\n)(.*)\|)/
    let endRex = /(\|\n?$)|(\|\n\n)/

    if (startRex.test(tempText)) {
      this.hasStartTable = true
    }

    if (this.hasStartTable && endRex.test(tempText)) {
      res = tempText.replace(startRex, (match) => {
        return `\n\`\`\`markdown\n${match.trim()}`
      })
      res = res.replace(endRex, (match) => {
        return `${match.trim()}\n\`\`\`\n`
      })
      this.hasStartTable = false
    } else if (this.hasStartTable) {
      res = tempText.replace(startRex, (match) => {
        return `\n\`\`\`markdown\n${match.trim()}`
      })
    }
    return res
  }

  private restoreCodeBlocks(
    textWithPlaceholders: string,
    placeholders: string[],
  ) {
    placeholders.forEach((placeholderContent, index) => {
      const placeholder = `__CODEBLOCK__${index}`
      textWithPlaceholders = textWithPlaceholders.replace(
        placeholder,
        () => placeholderContent,
      )
    })

    return textWithPlaceholders
  }

  convertMarkdownTables(markdownText: string) {
    const { textWithoutCodeBlocks, placeholders } =
      this.markCodeBlocks(markdownText)
    let convertedText = this.convertTablesWithoutCodeBlocks(
      textWithoutCodeBlocks,
    )
    convertedText = this.restoreCodeBlocks(convertedText, placeholders)
    return convertedText
  }
}

export const formatTable = new FormatTable()
