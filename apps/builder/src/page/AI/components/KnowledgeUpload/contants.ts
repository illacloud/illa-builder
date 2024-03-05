import {
  EXCEL_FILE_TYPE_RULES,
  PDF_FILE_TYPE_RULES,
  WORD_FILE_TYPE_RULES,
} from "@illa-public/utils"

export const JSON_RULES = ["application/json"]
export const ACCEPT = [
  WORD_FILE_TYPE_RULES[2],
  ...EXCEL_FILE_TYPE_RULES,
  ...PDF_FILE_TYPE_RULES,
  ".mdx",
  ".md",
  ".txt",
  ".json",
  // "image/*", // TODO: not support currently
]

export const MAX_MESSAGE_FILES_LENGTH = 10
export const MAX_FILE_SIZE = 20971520 // 20MB
