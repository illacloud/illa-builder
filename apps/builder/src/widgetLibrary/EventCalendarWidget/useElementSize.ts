import { useEffect, useState } from "react"
import { View } from "react-big-calendar"
import { getSpecialThemeColor } from "@illa-design/react"
import {
  isInWeekOrDay,
  isLightColor,
} from "@/widgetLibrary/EventCalendarWidget/utils"

export const useElementSize = (
  view: View,
  slotBackground: string,
  displayName: string,
) => {
  const [slotHeight, setSlotHeight] = useState(79)
  const [indicatorTop, setIndicatorTop] = useState(0)
  const [currentTime, setCurrentTime] = useState<Date>()
  const [isLight, setIsLight] = useState(true)

  useEffect(() => {
    if (!isInWeekOrDay(view)) {
      return
    }
    let observer: ResizeObserver | null = new ResizeObserver((entries) => {
        const { height } = entries[0].contentRect
        height && height > 80 && setSlotHeight(height)
      }),
      timeSlot = document.querySelector(".rbc-timeslot-group")
    if (timeSlot) {
      observer.observe(timeSlot)
    }
    return () => {
      if (timeSlot && observer && isInWeekOrDay(view)) {
        observer.unobserve(timeSlot)
        timeSlot = null
        observer = null
      }
    }
  }, [view])

  useEffect(() => {
    if (!isInWeekOrDay(view)) {
      return
    }
    const setIndicator = () => {
      const date = new Date(),
        hour = date.getHours(),
        minus = date.getMinutes()
      setIndicatorTop((hour + minus / 60) * (slotHeight + 1))
      setCurrentTime(date)
    }
    setIndicator()
    const intervalId = window.setInterval(setIndicator, 60000)
    return () => {
      if (isInWeekOrDay(view)) {
        clearInterval(intervalId)
      }
    }
  }, [slotHeight, view])

  useEffect(() => {
    if (slotBackground) {
      const formatColor = getSpecialThemeColor(slotBackground)
      setIsLight(isLightColor(formatColor))
    }
  }, [slotBackground])

  useEffect(() => {
    const toolBar = document.querySelector(".rbc-toolbar-label")
    toolBar && toolBar.setAttribute("data-target", displayName)
  }, [displayName])

  return {
    slotHeight,
    indicatorTop,
    currentTime,
    isLight,
  }
}
