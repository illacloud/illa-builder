import {
  EXCEL_FILE_TYPE_RULES,
  IMAGE_FILE_TYPE_RULES,
  PDF_FILE_TYPE_RULES,
  WORD_FILE_TYPE_RULES,
  matchRules,
} from "@illa-public/utils"
import { extractRawText } from "mammoth"
import { GlobalWorkerOptions, PDFDocumentProxy, getDocument } from "pdfjs-dist"
import pdfWorker from "pdfjs-dist/build/pdf.worker.js?url"
import { read, utils } from "xlsx"

GlobalWorkerOptions.workerSrc = pdfWorker

const C_MAP_URL = "https://unpkg.com/pdfjs-dist@2.16.105/cmaps/"

export const handleParseSheets = (
  data: any,
  type: "base64" | "buffer" | "string" = "base64",
) => {
  let res = {}
  const f = read(data, { type })
  const sheetNames = f.SheetNames
  for (let i = 0; i < sheetNames.length; i++) {
    const sheet = f.Sheets[sheetNames[i]]
    const value = {
      [sheetNames[i]]: utils.sheet_to_txt(sheet, { blankrows: false }),
    }
    res = {
      ...res,
      ...value,
    }
  }
  return JSON.stringify(res)
}

export const handleParsePdf = async (source: ArrayBuffer) => {
  const getPageText = async (pdf: PDFDocumentProxy, pageNo: number) => {
    const page = await pdf.getPage(pageNo)
    const tokenizedText = await page.getTextContent()
    const pageText = tokenizedText.items
      .map((token) => {
        if ("str" in token) {
          return token.str
        }
        return ""
      })
      .join("")
    return pageText
  }

  try {
    const pdf = await getDocument({
      data: source,
      cMapPacked: true,
      cMapUrl: C_MAP_URL,
    }).promise
    const maxPages = pdf.numPages
    const pageTextPromises = []
    for (let pageNo = 1; pageNo <= maxPages; pageNo++) {
      pageTextPromises.push(getPageText(pdf, pageNo))
    }
    const pageTexts = await Promise.all(pageTextPromises)
    const res = pageTexts.filter((text) => text !== "" && text !== undefined)
    return res.join("\n\n")
  } catch (e) {
    throw e
  }
}

export const handleParseDoc = async (source: ArrayBuffer) => {
  const res = (await extractRawText({ arrayBuffer: source })).value
  return res === "\n\n" ? "" : res
}

export const handleParseLikeText = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    var reader = new FileReader()
    reader.readAsText(file, "UTF-8")
    reader.onload = function () {
      resolve(reader.result as string)
    }
  })
}

export const handleParseImage = async (
  file: File,
  needUploadImage?: boolean,
): Promise<string> => {
  if (needUploadImage) {
    // upload image
    return "image url"
  }
  return ""
}

export const handleParseFile = async (
  file: File,
  needUploadImage?: boolean,
): Promise<string> => {
  if (matchRules(IMAGE_FILE_TYPE_RULES, file.type)) {
    return await handleParseImage(file, needUploadImage)
  }
  if (matchRules(EXCEL_FILE_TYPE_RULES, file.type)) {
    const buffer = await file.arrayBuffer()
    return handleParseSheets(buffer, "buffer")
  }
  if (matchRules(PDF_FILE_TYPE_RULES, file.type)) {
    const buffer = await file.arrayBuffer()
    return await handleParsePdf(buffer)
  }
  if (matchRules(WORD_FILE_TYPE_RULES, file.type)) {
    const buffer = await file.arrayBuffer()
    return await handleParseDoc(buffer)
  }
  return await handleParseLikeText(file)
}
