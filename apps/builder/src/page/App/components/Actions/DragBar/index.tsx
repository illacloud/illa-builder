import React, { FC, RefObject, useEffect, useState } from "react"
import { isNumber } from "@illa-design/react"
import { DragBarProps } from "./interface"
import { actionEditorDragBarStyle } from "./style"

const handleResize = (
  resizeRef: RefObject<HTMLDivElement>,
  movementY: number,
  minHeight: number,
  maxHeight?: number,
  placeholderRef?: RefObject<HTMLDivElement>,
  callback?: () => void,
) => {
  const resize = resizeRef?.current
  const placeholder = placeholderRef?.current
  if (!resize) return

  const { height } = resize.getBoundingClientRect()
  const updatedHeight = height - movementY

  if (isNumber(maxHeight) && updatedHeight > maxHeight) return

  if (updatedHeight < window.innerHeight && updatedHeight > minHeight) {
    resize.style.height = `${updatedHeight}px`
    if (placeholder) {
      placeholder.style.paddingBottom = `${updatedHeight + 48}px`
    }
    callback?.()
  }
}

export const DragBar: FC<DragBarProps> = (props) => {
  const {
    resizeRef,
    placeholderRef,
    minHeight = 300,
    maxHeight,
    onChange,
  } = props
  const [mouseDown, setMouseDown] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault()
      handleResize(
        resizeRef,
        e.movementY,
        minHeight,
        maxHeight,
        placeholderRef,
        () => {
          onChange?.()
        },
      )
    }
    if (mouseDown) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [maxHeight, minHeight, mouseDown, resizeRef, placeholderRef])

  useEffect(() => {
    handleResize(resizeRef, 0, minHeight, maxHeight)
    const handleMouseUp = () => setMouseDown(false)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [maxHeight, minHeight, resizeRef])

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
