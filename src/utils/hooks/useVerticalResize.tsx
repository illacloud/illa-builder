// thx appsmith
import React, { useState, useEffect, MutableRefObject } from "react"

/* import { unFocus } from "utils/helpers" */

/**
 * use vertical resize
 *
 * @param ref
 * @param onHeightChange
 */
export const useVerticalResize = (
  ref: MutableRefObject<HTMLElement | null>,
  onHeightChange?: (newHeight: number) => void,
  onDragEnd?: () => void,
  inverse = false,
) => {
  let MIN_HEIGHT = 0
  let MAX_HEIGHT = 0
  const [resizing, setResizing] = useState(false)
  const [position, setPosition] = useState(0)

  // saving min height and max height
  useEffect(() => {
    if (ref.current) {
      MIN_HEIGHT = parseInt(
        window.getComputedStyle(ref.current).minHeight.replace("px", ""),
      )
      MAX_HEIGHT = parseInt(
        window.getComputedStyle(ref.current).maxHeight.replace("px", ""),
      )
    }
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
    /* unFocus(document, window) */
    setPosition(event.touches[0].clientY)
    setResizing(true)
    /* document.body.classList.add("cursor-ew-resize") */
  }

  /**
   * sets resizing false on mouse up
   * also calls onDragFinished if any
   */
  const onMouseUp = () => {
    if (resizing) {
      if (typeof onDragEnd === "function") {
        onDragEnd()
      }

      setResizing(false)
      /* document.body.classList.remove("cursor-ew-resize") */
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
      /* unFocus(document, window) */

      if (ref.current) {
        const height = ref.current.clientHeight
        const current = event.touches[0].clientY
        const positionDelta = position - current
        const heightDelta = inverse ? positionDelta : -positionDelta
        let newHeight = height - heightDelta
        const newPosition = position - positionDelta

        if (newHeight < MIN_HEIGHT) {
          newHeight = MIN_HEIGHT
        } else if (newHeight > MAX_HEIGHT) {
          newHeight = MAX_HEIGHT
        } else {
          setPosition(newPosition)
        }

        if (typeof onHeightChange === "function") {
          onHeightChange(newHeight)
        }
      }
    }
  }

  return { onTouchStart, onMouseDown, onMouseUp, resizing }
}
