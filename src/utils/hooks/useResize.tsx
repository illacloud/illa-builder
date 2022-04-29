// thx appsmith
import { useState, useEffect, MutableRefObject } from "react"
import { isFunction } from "@illa-design/system"
import { unFocus } from "@/utils/helpers"

/**
 * use vertical resize
 *
 * @param ref
 * @param onChange
 */
export const useResize = (
  direction: "horizontal" | "vertical",
  ref: MutableRefObject<HTMLElement | null>,
  onChange?: (value: number) => void,
  onDragEnd?: () => void,
  inverse = false,
) => {
  let MIN_HEIGHT = 0
  let MAX_HEIGHT = 0
  let MIN_WIDTH = 0
  let MAX_WIDTH = 0
  const [resizing, setResizing] = useState(false)
  const [position, setPosition] = useState([0, 0])
  const [originHeight, setOriginHeight] = useState<number>(0)
  const [originWidth, setOriginWidth] = useState<number>(0)

  // saving min/max-height/width
  useEffect(() => {
    const { minHeight, maxHeight, minWidth, maxWidth } =
      window.getComputedStyle(ref.current)
    const parsePX2Number = (value: string) =>
      Number.parseInt(value.replace("px", ""), 10)

    MIN_HEIGHT = parsePX2Number(minHeight)
    MAX_HEIGHT = parsePX2Number(maxHeight)
    MIN_WIDTH = parsePX2Number(minWidth)
    MAX_WIDTH = parsePX2Number(maxWidth)
  })

  // registering event listeners
  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("touchmove", onTouchMove)

    return () => {
      document.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("touchmove", onTouchMove)
    }
  }, [resizing, position])

  /**
   * passing the event to touch start on mouse down
   *
   * @param event
   */
  const onMouseDown = (event: React.MouseEvent) => {
    const eventWithTouches = Object.assign({}, event, {
      touches: [{ clientX: event.clientX, clientY: event.clientY }],
    })

    onTouchStart(eventWithTouches)
  }

  /**
   * sets resizing and position on touch start
   */
  const onTouchStart = (
    event:
      | React.TouchEvent
      | (React.MouseEvent<Element, MouseEvent> & {
        touches: { clientX: number; clientY: number }[]
      }),
  ) => {
    unFocus(document, window)

    const { clientX, clientY } = event.touches[0]

    setPosition([clientX, clientY])

    if (ref.current) {
      setOriginHeight(ref.current.clientHeight)
      setOriginWidth(ref.current.clientWidth)
    }

    setResizing(true)

    document.body.style.cursor = "row-resize"
  }

  /**
   * sets resizing false on mouse up
   * also calls onDragFinished if any
   */
  const onMouseUp = () => {
    if (resizing) {
      if (isFunction(onDragEnd)) {
        onDragEnd()
      }

      setResizing(false)
      document.body.style.cursor = "unset"
    }
  }

  /**
   * passing the event to touch move on mouse move
   */
  const onMouseMove = (event: MouseEvent) => {
    const eventWithTouches = Object.assign({}, event, {
      touches: [{ clientX: event.clientX, clientY: event.clientY }],
    })
    onTouchMove(eventWithTouches)
  }

  /**
   * calculate the new height based on the pixel moved
   *
   * @param event
   */
  const onTouchMove = (
    event:
      | TouchEvent
      | (MouseEvent & { touches: { clientX: number; clientY: number }[] }),
  ) => {
    if (resizing) {
      unFocus(document, window)

      const [originClientX, originClientY] = position

      if (ref.current) {
        if (direction === "vertical") {
          const current = event.touches[0].clientY
          const positionDelta = originClientY - current
          const heightDelta = inverse ? positionDelta : -positionDelta
          let newHeight = originHeight - heightDelta

          if (newHeight < MIN_HEIGHT) {
            newHeight = MIN_HEIGHT
          } else if (newHeight > MAX_HEIGHT) {
            newHeight = MAX_HEIGHT
          }

          if (isFunction(onChange)) {
            onChange(newHeight)
          }
        } else {
          const current = event.touches[0].clientX
          const positionDelta = originClientX - current
          const widthDelta = inverse ? positionDelta : -positionDelta
          let newWidth = originWidth - widthDelta

          if (newWidth < MIN_WIDTH) {
            newWidth = MIN_WIDTH
          } else if (newWidth > MAX_WIDTH) {
            newWidth = MAX_WIDTH
          }

          if (isFunction(onChange)) {
            onChange(newWidth)
          }
        }
      }
    }
  }

  return { onTouchStart, onMouseDown, onMouseUp, resizing }
}
