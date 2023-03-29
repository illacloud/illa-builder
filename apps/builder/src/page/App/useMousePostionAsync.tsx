import { throttle } from "lodash"
import { RefObject, useCallback, useContext, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useWindowSize } from "react-use"
import { Connection } from "@/api/ws"
import { MovingMessageBin, Signal, Target } from "@/api/ws/ILLA_PROTO"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { getMousePositionWithIllaUnit } from "./components/DotPanel/calcMouse"
import { MouseMoveContext } from "./components/DotPanel/context/mouseMoveContext"

const sendMousePosition = (
  appId: string,
  userID: string,
  nickname: string,
  parentDisplayName: string,
  x: number,
  y: number,
  w: number,
  h: number,
  isLeave: boolean = false,
) => {
  const ws = Connection.getBinaryRoom("app", appId ?? "")
  const payloadObject: MovingMessageBin = {
    signal: Signal.MOVE_CURSOR,
    target: Target.CURSOR,
    clientID: "",
    needBroadcast: true,
    userID,
    nickname,
    status: isLeave ? -1 : 1,
    parentDisplayName: parentDisplayName,
    displayNames: "",
    x,
    y,
    w,
    h,
  }
  console.debug("[debug] payloadObject", payloadObject)
  const binMessage = MovingMessageBin.toBinary(payloadObject)
  ws?.send(binMessage)
}

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
  const sendMessageHandlerRef = useRef(
    throttle(sendMousePosition, 50, {
      leading: true,
      trailing: true,
    }),
  )

  const mouseMoveContext = useContext(MouseMoveContext)
  const mouseEnterHandler = useCallback(() => {
    mouseMoveContext.addHoverWidget(displayName)
  }, [displayName, mouseMoveContext])

  const mouseLeaveHandler = useCallback(() => {
    mouseMoveContext.deleteHoverWidget(displayName)
    if (isRoot) {
      sendMessageHandlerRef.current(
        params.appId ?? "",
        userInfo.userId,
        userInfo.nickname,
        displayName,
        0,
        0,
        0,
        0,
        true,
      )
    }
  }, [
    displayName,
    isRoot,
    mouseMoveContext,
    params.appId,
    userInfo.nickname,
    userInfo.userId,
  ])

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
      sendMessageHandlerRef.current(
        params.appId ?? "",
        userInfo.userId,
        userInfo.nickname,
        displayName,
        x,
        y,
        w,
        h,
      )
    },
    [
      containerRef,
      displayName,
      mouseMoveContext.hoveredWidgets,
      params.appId,
      unitWidth,
      userInfo.nickname,
      userInfo.userId,
    ],
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
    if (wrapperRef.current) {
      wrapperRef.current.addEventListener("mouseenter", mouseEnterHandler)
      wrapperRef.current?.addEventListener("mousemove", mouseMoveAsyncHandler)
      wrapperRef.current?.addEventListener("mouseleave", mouseLeaveHandler)
    }
    return () => {
      if (wrapperRef.current)
        wrapperRef.current.removeEventListener("mouseenter", mouseEnterHandler)
      wrapperRef.current?.removeEventListener(
        "mousemove",
        mouseMoveAsyncHandler,
      )
      wrapperRef.current?.removeEventListener("mouseleave", mouseLeaveHandler)
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
