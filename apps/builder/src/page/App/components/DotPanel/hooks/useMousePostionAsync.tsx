import { RefObject, useCallback, useContext, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useWindowSize } from "react-use"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { getMousePositionWithIllaUnit } from "../calcMouse"
import { MouseMoveContext } from "../context/mouseMoveContext"
import { sendMousePositionHandler } from "../utils/sendBinaryMessage"

export const useMousePositionAsync = (
  containerRef: RefObject<HTMLDivElement>,
  unitWidth: number,
  displayName: string,
  isRoot: boolean = false,
) => {
  const params = useParams()
  const userInfo = useSelector(getCurrentUser)
  const { width, height } = useWindowSize()
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const mouseMoveContext = useContext(MouseMoveContext)
  const mouseEnterHandler = useCallback(() => {
    mouseMoveContext.addHoverWidget(displayName)
  }, [displayName, mouseMoveContext])

  const mouseLeaveHandler = useCallback(() => {
    mouseMoveContext.deleteHoverWidget(displayName)
    if (isRoot) {
      sendMousePositionHandler(displayName, 0, 0, 0, 0, true)
    }
  }, [displayName, isRoot, mouseMoveContext])

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
      const { x, y, w, h } = getMousePositionWithIllaUnit(
        unitWidth,
        containerPosition,
        mousePosition,
        containerRef.current?.scrollTop,
      )
      if (
        Number.isInteger(w) &&
        Number.isInteger(h) &&
        !Number.isNaN(w) &&
        !Number.isNaN(h)
      ) {
        sendMousePositionHandler(displayName, x, y, w, h)
      }
    },
    [containerRef, displayName, mouseMoveContext.hoveredWidgets, unitWidth],
  )

  const visibilityChangeHandler = useCallback(() => {
    if (document.hidden) {
      mouseLeaveHandler()
    }
  }, [mouseLeaveHandler])

  const pageHideHandler = useCallback(
    (e: Event) => {
      mouseLeaveHandler()
    },
    [mouseLeaveHandler],
  )

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
    userInfo.userId,
    width,
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

  return { wrapperRef }
}
