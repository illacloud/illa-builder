// import { PDFDocumentProxy } from "@react-pdf/types"
import { FC, forwardRef, useCallback, useEffect, useRef, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
// import { Document, Page } from "react-pdf"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"
import { Button, Loading } from "@illa-design/react"
import {
  pdfContainerStyle,
  toolBarStyle,
} from "@/widgetLibrary/PdfWidget/style"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { InputWidgetProps, WrappedInputProps } from "./interface"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export const Pdf = forwardRef<HTMLInputElement, WrappedInputProps>(
  (props, ref) => {
    const {
      displayName,
      value,
      colorScheme,
      handleUpdateDsl,
      handleOnChange,
      handleOnFocus,
    } = props

    const url =
      "https://upload.wikimedia.org/wikipedia/commons/e/ee/Guideline_No._GD-Ed-2214_Marman_Clamp_Systems_Design_Guidelines.pdf"
    const [numPages, setNumPages] = useState<number>(0)
    const [pageNumber, setPageNumber] = useState<number>(0)
    const pageRef = useRef<HTMLDivElement[]>([])
    const documentRef = useRef<HTMLDivElement>(null)
    const updatePage = useCallback(
      (offset: number) => {
        const { offsetTop } = pageRef.current[pageNumber + offset - 1]
        console.log(offsetTop, "offsetTop", pageNumber)
        if (documentRef.current) {
          documentRef.current.scrollTop = offsetTop
          documentRef.current.scrollTo({ top: offsetTop })
        }
        setPageNumber((prevPageNumber) => (prevPageNumber || 1) + offset)
      },
      [pageNumber],
    )

    const downloadFile = async () => {
      const pdf = await fetch(url)
      const pdfBlob = await pdf.blob()
      const pdfURL = URL.createObjectURL(pdfBlob)
      const anchor = document.createElement("a")
      anchor.href = pdfURL
      anchor.download = displayName
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
      URL.revokeObjectURL(pdfURL)
    }

    return (
      <div css={pdfContainerStyle}>
        <div ref={documentRef}>
          <Document
            loading={<Loading />}
            file={url}
            onLoadSuccess={({ numPages: nextNumPages }) => {
              setNumPages(nextNumPages)
            }}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                inputRef={(el) => {
                  if (!el) return
                  pageRef.current[index] = el
                }}
              />
            ))}
          </Document>
        </div>

        <div css={toolBarStyle} className="pdf-page-controls">
          <Button
            disabled={pageNumber <= 1}
            onClick={() => updatePage(-1)}
            type="button"
            aria-label="Previous page"
          >
            ‹
          </Button>
          <span>
            {pageNumber} of {numPages}
          </span>
          <Button
            disabled={pageNumber >= numPages}
            onClick={() => updatePage(1)}
            type="button"
            aria-label="Next page"
          >
            ›
          </Button>
          <Button onClick={downloadFile}>Download PDF</Button>
        </div>
      </div>
    )
  },
)
Pdf.displayName = "Pdf"

export const PdfWidget: FC<InputWidgetProps> = (props) => {
  const {
    value,
    placeholder,
    disabled,
    colorScheme,
    displayName,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    tooltipText,
  } = props

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, {
      value,
      placeholder,
      disabled,
      colorScheme,
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    placeholder,
    colorScheme,
    displayName,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  ])
  return (
    <div ref={wrapperRef}>
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <Pdf {...props} />
      </TooltipWrapper>
    </div>
  )
}

PdfWidget.displayName = "PdfWidget"
