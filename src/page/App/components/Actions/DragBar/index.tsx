import React, { useState, useEffect, RefObject, FC } from "react"
import { actionEditorDragBarStyle } from "./style"
import { DragBarProps } from "./interface"

const handleResize = (
  movementY: number,
  minHeight: number,
  resizeRef: RefObject<HTMLDivElement>,
) => {
  const resize = resizeRef?.current
  if (!resize) return

  const { height } = resize.getBoundingClientRect()
  const updatedHeight = height - movementY

  if (updatedHeight < window.innerHeight && updatedHeight > minHeight) {
    resize.style.height = `${height - movementY}px`
  }
}

export const DragBar: FC<DragBarProps> = (props) => {
  const { resizeRef, minHeight = 300 } = props
  const [mouseDown, setMouseDown] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault()
      handleResize(e.movementY, minHeight, resizeRef)
    }
    if (mouseDown) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseDown])

  useEffect(() => {
    handleResize(0, minHeight, resizeRef)
    const handleMouseUp = () => setMouseDown(false)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <div
      css={actionEditorDragBarStyle}
      onMouseDown={() => {
        setMouseDown(true)
      }}
    />
  )
}

DragBar.displayName = "DragBar"
