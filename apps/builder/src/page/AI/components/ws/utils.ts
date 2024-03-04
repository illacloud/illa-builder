import { KnowledgeFile } from "@illa-public/public-types"

export const formatMessageString = (
  text: string,
  knowledgeFiles?: KnowledgeFile[],
) => {
  let res = text
  if (!knowledgeFiles || knowledgeFiles.length === 0) return res
  const fileString = knowledgeFiles
    .map((file, i) => {
      return `
    File${i}
    File name: [${file.name}]
    File content: [${file.value}]
    `
    })
    .join("\n\n")
  return `${res}\n${fileString}`
}
