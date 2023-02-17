import {
  FC,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Document, Page, pdfjs } from "react-pdf"
// import { Document, Page } from "react-pdf"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"
import { Button, Loading } from "@illa-design/react"
import {
  documentInitStyle,
  pdfContainerStyle,
  pdfStyle,
  toolBarStyle,
} from "@/widgetLibrary/PdfWidget/style"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { PdfWidgetProps, WrappedPdfProps } from "./interface"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export const Pdf = forwardRef<HTMLDivElement, WrappedPdfProps>((props, ref) => {
  const {
    displayName,
    width,
    height,
    scaleMode,
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

  const { scaleWidth, scaleHeight } = useMemo(() => {
    if (scaleMode === "width") {
      return { scaleWidth: width }
    }
    return { scaleHeight: height }
  }, [width, height, scaleMode])
  console.log(scaleWidth, scaleHeight, "scaleWidth, scaleHeight")
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
    <div css={pdfContainerStyle} ref={ref}>
      <div css={pdfStyle} ref={documentRef}>
        <Document
          css={documentInitStyle}
          loading={<Loading />}
          file={url}
          onLoadSuccess={({ numPages: nextNumPages, getDownloadInfo }) => {
            setNumPages(nextNumPages)
          }}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              loading={<Loading />}
              width={scaleWidth}
              height={scaleHeight}
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
})
Pdf.displayName = "Pdf"

export const PdfWidget: FC<PdfWidgetProps> = (props) => {
  const {
    value,
    colorScheme,
    displayName,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    tooltipText,
    w,
    h,
  } = props

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, {
      value,
      colorScheme,
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    colorScheme,
    displayName,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  ])

  const { width, height } = useMemo(() => {
    return {
      width: wrapperRef.current?.offsetWidth || 0,
      height: wrapperRef.current?.offsetHeight || 0,
    }
  }, [w, h])

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <Pdf ref={wrapperRef} width={width} height={height} {...props} />
    </TooltipWrapper>
  )
}

PdfWidget.displayName = "PdfWidget"
