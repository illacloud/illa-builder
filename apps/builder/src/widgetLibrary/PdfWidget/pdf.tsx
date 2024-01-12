import { debounce } from "lodash-es"
import pdfWorker from "pdfjs-dist/build/pdf.worker.js?url"
import {
  FC,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useTranslation } from "react-i18next"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"
import {
  DownloadIcon,
  Loading,
  NextIcon,
  PreviousIcon,
} from "@illa-design/react"
import { ToolButton } from "@/widgetLibrary/PdfWidget/button"
import {
  applyHiddenStyle,
  documentInitStyle,
  fullPageStyle,
  pageStyle,
  pdfContainerStyle,
  pdfStyle,
  pdfWrapperStyle,
  toolBarStyle,
} from "@/widgetLibrary/PdfWidget/style"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { PdfWidgetProps, WrappedPdfProps } from "./interface"

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker

export const Pdf = forwardRef<HTMLDivElement, WrappedPdfProps>((props, ref) => {
  const { displayName, width, height, scaleMode, url, showToolBar } = props
  const { t } = useTranslation()
  const pageRef = useRef<HTMLDivElement[]>([])
  const documentRef = useRef<HTMLDivElement>(null)
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [hasButtonClicked, setButtonClick] = useState(false)
  const hasScrollRef = useRef(false)
  const timeoutRef = useRef<number | null>(null)

  const { scaleWidth, scaleHeight } = useMemo(() => {
    if (scaleMode === "width") {
      return { scaleWidth: width }
    }
    return { scaleHeight: height }
  }, [width, height, scaleMode])

  const updatePage = useCallback(
    (offset: number) => {
      const { offsetTop } = pageRef.current[pageNumber + offset - 1]
      if (documentRef.current) {
        documentRef.current.scrollTop = offsetTop - 40
        setButtonClick(true)
      }
      setPageNumber((prevPageNumber) => (prevPageNumber || 1) + offset)
    },
    [pageNumber],
  )

  const updateCurrentPage = debounce(() => {
    if (hasScrollRef.current) {
      hasScrollRef.current = false
      // get current page
      const { scrollTop } = documentRef.current || {}
      if (!scrollTop) return
      const currentPage = pageRef.current.findIndex(
        (elem) => elem.offsetTop - 40 >= scrollTop,
      )
      setPageNumber(currentPage === -1 ? numPages : currentPage)
    }
  }, 150)

  const downloadFile = useCallback(async () => {
    if (!url) return
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
  }, [url, displayName])

  const handleScroll = () => {
    if (hasButtonClicked) return setButtonClick(false)
    if (!hasScrollRef.current) {
      hasScrollRef.current = true
      updateCurrentPage()
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [])

  if (!url) {
    return <div css={fullPageStyle}>{t("widget.pdf.empty")}</div>
  }

  return (
    <div css={pdfContainerStyle} ref={ref}>
      {loading ? (
        <div css={fullPageStyle}>
          <Loading />
        </div>
      ) : null}
      {showToolBar && !error && !loading ? (
        <div css={[toolBarStyle, applyHiddenStyle(loading)]}>
          <ToolButton
            disabled={pageNumber <= 1}
            onClick={() => updatePage(-1)}
            type="button"
            shape="round"
            aria-label="Previous page"
            icon={<PreviousIcon />}
          />
          <ToolButton
            disabled={pageNumber >= numPages}
            onClick={() => updatePage(1)}
            type="button"
            shape="round"
            aria-label="Next page"
            icon={<NextIcon />}
          />
          <ToolButton
            type="button"
            shape="round"
            onClick={downloadFile}
            icon={<DownloadIcon />}
          />
        </div>
      ) : null}
      <div
        css={[pdfStyle, applyHiddenStyle(loading)]}
        ref={documentRef}
        onScroll={handleScroll}
      >
        <Document
          css={documentInitStyle}
          loading={
            <div css={fullPageStyle}>
              <Loading />
            </div>
          }
          error={<div css={fullPageStyle}>{t("widget.pdf.failed")}</div>}
          file={url}
          onLoadSuccess={({ numPages: nextNumPages }) => {
            setNumPages(nextNumPages)
            // [TODO] wait react-pdf fix
            clearTimeout(timeoutRef.current as number)
            timeoutRef.current = window.setTimeout(() => {
              setLoading(false)
              setError(false)
            }, 200)
          }}
          onLoadError={() => {
            setLoading(false)
            setError(true)
          }}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              css={pageStyle}
              loading={""}
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
    </div>
  )
})

Pdf.displayName = "Pdf"

export const PdfWidget: FC<PdfWidgetProps> = (props) => {
  const {
    displayName,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    handleUpdateMultiExecutionResult,
    handleUpdateOriginalDSLMultiAttr,
    tooltipText,
    width,
    height,
    scaleMode,
    url,
    showToolBar,
    w,
    h,
  } = props

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    updateComponentRuntimeProps({
      setFileUrl: (url: string) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { url },
          },
        ])
      },
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    handleUpdateMultiExecutionResult,
    displayName,
  ])

  useEffect(() => {
    const offsetWidth = wrapperRef.current?.offsetWidth
    const offsetHeight = wrapperRef.current?.offsetHeight
    if (
      offsetWidth &&
      offsetHeight &&
      (offsetWidth !== width || offsetHeight !== height)
    ) {
      handleUpdateOriginalDSLMultiAttr?.(
        {
          width: wrapperRef.current.offsetWidth,
          height: wrapperRef.current.offsetHeight,
        },
        true,
      )
    }
  }, [w, h, handleUpdateOriginalDSLMultiAttr, width, height])

  return (
    <div css={pdfWrapperStyle} ref={wrapperRef}>
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <Pdf
          {...props}
          updateComponentRuntimeProps={updateComponentRuntimeProps}
          deleteComponentRuntimeProps={deleteComponentRuntimeProps}
          displayName={displayName}
          width={width}
          height={height}
          scaleMode={scaleMode}
          url={url}
          showToolBar={showToolBar}
        />
      </TooltipWrapper>
    </div>
  )
}

PdfWidget.displayName = "PdfWidget"
export default PdfWidget
