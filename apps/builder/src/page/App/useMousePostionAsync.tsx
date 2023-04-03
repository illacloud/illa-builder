import { floor, throttle } from "lodash"
import { RefObject, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useWindowSize } from "react-use"
import { Connection } from "@/api/ws"
import { MovingMessageBin, Signal, Target } from "@/api/ws/ILLA_PROTO"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { getMousePositionWithIllaUnit } from "./components/DotPanel/calcMouse"

const sendMousePosition = (
  appId: string,
  userID: string,
  nickname: string,
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
    status: isLeave ? -1 : 0,
    parentDisplayName: "",
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
) => {
  const params = useParams()
  const userInfo = useSelector(getCurrentUser)
  const { width, height } = useWindowSize()
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const sendMessageHandlerRef = useRef(
    throttle(sendMousePosition, 500, {
      leading: true,
      trailing: true,
    }),
  )

  useEffect(() => {
    const mouseAsyncHandler = (e: MouseEvent) => {
      const { clientX, clientY } = e
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
        x,
        y,
        w,
        h,
      )
    }
    if (wrapperRef.current) {
      wrapperRef.current?.addEventListener("mousemove", mouseAsyncHandler)
    }
    return () => {
      if (wrapperRef.current)
        wrapperRef.current?.removeEventListener("mousemove", mouseAsyncHandler)
    }
  }, [
    containerRef,
    height,
    params.appId,
    unitWidth,
    userInfo.nickname,
    userInfo.userId,
    width,
  ])

  // useEffect(() => {
  //   const removeCurrentUser = () => {}
  //   document.addEventListener("blur")
  // }, [])

  return { wrapperRef }
}
