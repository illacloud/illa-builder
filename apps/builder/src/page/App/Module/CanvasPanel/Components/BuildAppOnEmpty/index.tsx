import { CARD_NORMAL_WIDTH, fetchTemplateList } from "@illa-public/create-app"
import { ProductMarketApp } from "@illa-public/market-app"
import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import useMeasure from "react-use-measure"
import { CloseIcon, isObject } from "@illa-design/react"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { getAppId } from "@/redux/currentApp/appInfo/appInfoSelector"
import {
  getCurrentAppPageNames,
  getWidgetCount,
  searchDSLByDisplayName,
} from "@/redux/currentApp/components/componentsSelector"
import { getIsDragging } from "@/redux/currentApp/executionTree/executionSelector"
import { ILLABuilderStorage } from "@/utils/storage"
import BuildByDatabase from "./BuildByDatabase"
import BuildByTemplate from "./BuildByTemplate"
import PreviewAppImage from "./PreviewAppImage"
import {
  CARD_LIST_GAP,
  CARD_LIST_SEPARATOR_WIDTH,
  CONTAINER_PADDING,
  DATABASE_CARD_WIDTH,
  DATABASE_CONTAINER_GAP,
  MORE_CARD_WIDTH,
  SHOWN_BUILD_APP,
} from "./constants"
import {
  closeIconStyle,
  containerHeaderStyle,
  containerStyle,
  lineStyle,
  templateContainerStyle,
} from "./style"

const BuildAppOnEmpty: FC = () => {
  const pages = useSelector(getCurrentAppPageNames)
  const actionList = useSelector(getActionList)
  const appID = useSelector(getAppId)
  const widgetCount = useSelector(getWidgetCount)
  const shownApp = ILLABuilderStorage.getLocalStorage(SHOWN_BUILD_APP)
  const [containerRef, containerRect] = useMeasure()
  const [show, setShow] = useState(isObject(shownApp) ? !shownApp[appID] : true)
  const isDraggingInGlobal = useSelector(getIsDragging)

  const isEmptyApp = useMemo(() => {
    if (pages.length > 1 || actionList.length > 0 || widgetCount > 0)
      return false
    for (let displayName of pages) {
      const pageNode = searchDSLByDisplayName(displayName)!
      const bodySectionDisplayName = pageNode.childrenNode[0]
      const bodySectionNode = searchDSLByDisplayName(bodySectionDisplayName)!
      if (bodySectionNode.childrenNode.length > 1) return false
    }
    return true
  }, [actionList.length, pages, widgetCount])

  const handleCloseBuildApp = useCallback(() => {
    setShow(false)
    const localShownBuildApp =
      ILLABuilderStorage.getLocalStorage(SHOWN_BUILD_APP) || {}
    ILLABuilderStorage.setLocalStorage(SHOWN_BUILD_APP, {
      ...localShownBuildApp,
      [appID]: true,
    })
  }, [appID])

  const [templateList, setTemplateList] = useState<ProductMarketApp[]>([])
  const [showAnimation, setShowAnimation] = useState(true)
  const [showPreviewSrc, setShowPreviewSrc] = useState<string>()

  const { showCardCount, headerWidth } = useMemo(() => {
    const otherWidth =
      DATABASE_CARD_WIDTH +
      CARD_LIST_SEPARATOR_WIDTH +
      MORE_CARD_WIDTH +
      DATABASE_CONTAINER_GAP * 2

    const count = Math.floor(
      (containerRect.width - CONTAINER_PADDING * 2 - otherWidth) /
        (CARD_NORMAL_WIDTH + CARD_LIST_GAP),
    )

    const showCardCount = count < 1 ? 1 : count
    return {
      showCardCount,
      headerWidth:
        otherWidth + showCardCount * (CARD_NORMAL_WIDTH + CARD_LIST_GAP),
    }
  }, [containerRect.width])

  const finalTemplateList =
    templateList.length > 0 ? templateList : new Array(showCardCount).fill({})

  const handleAnimateEnd = () => {
    setShowAnimation(false)
    const localShownBuildApp =
      ILLABuilderStorage.getLocalStorage(SHOWN_BUILD_APP) || {}
    ILLABuilderStorage.setLocalStorage(SHOWN_BUILD_APP, {
      ...localShownBuildApp,
      [appID]: true,
    })
  }

  const handleShowPreview = (src?: string) => {
    setShowPreviewSrc(src)
  }

  useEffect(() => {
    const controller = new AbortController()
    fetchTemplateList({}, controller.signal).then((res) => {
      setTemplateList(res.data.products)
    })
    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    if (!isEmptyApp) {
      handleCloseBuildApp()
    }
  }, [handleCloseBuildApp, isEmptyApp])

  if (!show || !isEmptyApp) {
    return null
  }

  return (
    <>
      <div css={containerStyle(isDraggingInGlobal)} ref={containerRef}>
        <div css={containerHeaderStyle(headerWidth)}>
          <span css={closeIconStyle} onClick={handleCloseBuildApp}>
            <CloseIcon size="12px" />
          </span>
        </div>
        <div css={templateContainerStyle} onAnimationEnd={handleAnimateEnd}>
          <BuildByDatabase />
          <span css={lineStyle} />
          <BuildByTemplate
            templateList={finalTemplateList}
            showCardCount={showCardCount}
            showAnimation={showAnimation}
            handleShowPreview={handleShowPreview}
          />
        </div>
      </div>
      {!!showPreviewSrc && <PreviewAppImage showPreviewSrc={showPreviewSrc} />}
    </>
  )
}

export default BuildAppOnEmpty
