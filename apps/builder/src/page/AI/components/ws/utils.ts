import { KnowledgeFile } from "@illa-public/public-types"

export const formatMessageString = (
  text: string,
  knowledgeFiles?: KnowledgeFile[],
) => {
  let res = text
  if (!knowledgeFiles || knowledgeFiles.length === 0) return res
  const fileString = knowledgeFiles
    .map((file) => {
      return `File name: [${file.name}]\nFile content: [\n${file.value}\n]
    `
    })
    .join("\n\n")

  return `${res}\n${fileString}`
}
