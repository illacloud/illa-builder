import { getCurrentUser } from "@illa-public/user-data"
import { RefObject, useCallback, useContext, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useWindowSize } from "react-use"
import { getIsDragging } from "@/redux/currentApp/executionTree/executionSelector"
import { MouseMoveContext } from "../context/mouseMoveContext"
import { getMousePositionWithIllaUnit } from "../utils/calcMouse"
import { sendMousePositionHandler } from "../utils/sendBinaryMessage"

interface CursorPosition {
  xMod: number
  yMod: number
  xInteger: number
  yInteger: number
}

export const useMousePositionAsync = (
  containerRef: RefObject<HTMLDivElement>,
  unitWidth: number,
  displayName: string,
  isRoot: boolean = false,
  wrapperRef: RefObject<HTMLDivElement>,
) => {
  const params = useParams()
  const userInfo = useSelector(getCurrentUser)
  const isDragging = useSelector(getIsDragging)
  const { width, height } = useWindowSize()
  const cursorPositionRef = useRef<CursorPosition>({
    xInteger: 0,
    yInteger: 0,
    xMod: 0,
    yMod: 0,
  })

  const mouseMoveContext = useContext(MouseMoveContext)
  const mouseEnterHandler = useCallback(() => {
    mouseMoveContext.addHoverWidget(displayName)
  }, [displayName, mouseMoveContext])

  const mouseLeaveHandler = useCallback(() => {
    mouseMoveContext.deleteHoverWidget(displayName)
    if (isRoot && !isDragging) {
      sendMousePositionHandler(displayName, 0, 0, 0, 0, true)
    }
  }, [displayName, isDragging, isRoot, mouseMoveContext])

  const mouseMoveAsyncHandler = useCallback(
    (e: MouseEvent) => {
      const { clientX, clientY } = e
      if (
        mouseMoveContext.hoveredWidgets.length === 0 ||
        mouseMoveContext.hoveredWidgets.at(-1) !== displayName
      )
        return
      const containerRect = containerRef.current?.getBoundingClientRect()
      const containerPosition = {
        x: containerRect?.left ?? 0,
        y: containerRect?.top ?? 0,
      }
      const mousePosition = {
        x: clientX,
        y: clientY,
      }
      const { xInteger, xMod, yInteger, yMod } = getMousePositionWithIllaUnit(
        unitWidth,
        containerPosition,
        mousePosition,
        containerRef.current?.scrollTop,
      )
      cursorPositionRef.current = {
        xInteger,
        yInteger,
        xMod,
        yMod,
      }
      if (
        Number.isInteger(xInteger) &&
        Number.isInteger(yInteger) &&
        !Number.isNaN(xMod) &&
        !Number.isNaN(yMod) &&
        !isDragging
      ) {
        sendMousePositionHandler(displayName, xInteger, yInteger, xMod, yMod)
      }
    },
    [
      containerRef,
      displayName,
      isDragging,
      mouseMoveContext.hoveredWidgets,
      unitWidth,
    ],
  )

  const visibilityChangeHandler = useCallback(() => {
    if (document.hidden) {
      mouseLeaveHandler()
    }
  }, [mouseLeaveHandler])

  const pageHideHandler = useCallback(() => {
    mouseLeaveHandler()
  }, [mouseLeaveHandler])

  useEffect(() => {
    const wrapperNode = wrapperRef.current
    if (wrapperNode) {
      wrapperNode.addEventListener("mouseenter", mouseEnterHandler)
      wrapperNode?.addEventListener("mousemove", mouseMoveAsyncHandler)
      wrapperNode?.addEventListener("mouseleave", mouseLeaveHandler)
    }
    return () => {
      if (wrapperNode) {
        wrapperNode.removeEventListener("mouseenter", mouseEnterHandler)
        wrapperNode.removeEventListener("mousemove", mouseMoveAsyncHandler)
        wrapperNode.removeEventListener("mouseleave", mouseLeaveHandler)
      }
    }
  }, [
    containerRef,
    height,
    mouseEnterHandler,
    mouseLeaveHandler,
    mouseMoveAsyncHandler,
    params.appId,
    unitWidth,
    userInfo.nickname,
    userInfo.userID,
    width,
    wrapperRef,
  ])

  useEffect(() => {
    if (isRoot) {
      window.addEventListener("blur", mouseLeaveHandler)
      window.addEventListener("visibilitychange", visibilityChangeHandler)
      window.addEventListener("pagehide", pageHideHandler)
    }

    return () => {
      if (isRoot) {
        window.removeEventListener("blur", mouseLeaveHandler)
        window.removeEventListener("visibilitychange", visibilityChangeHandler)
        window.removeEventListener("pagehide", pageHideHandler)
      }
    }
  }, [isRoot, mouseLeaveHandler, pageHideHandler, visibilityChangeHandler])

  return { cursorPositionRef }
}
