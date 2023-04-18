import { useEffect, useState } from "react"
import { View } from "react-big-calendar"
import { isInWeekOrDay } from "@/widgetLibrary/EventCalendarWidget/utils"

export const useElementSize = (view: View, isResource: boolean) => {
  const [slotHeight, setSlotHeight] = useState(39)
  const [indicatorTop, setIndicatorTop] = useState(0)
  const [contentWidth, setContentWidth] = useState(0)
  const [currentTime, setCurrentTime] = useState<Date>()

  useEffect(() => {
    if (!isInWeekOrDay(view)) {
      return
    }
    let observer: ResizeObserver | null = new ResizeObserver((entries) => {
        const { height } = entries[0].contentRect
        height && height > 40 && setSlotHeight(height)
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
    let timeContent = document.querySelector(".rbc-time-content"),
      observer: ResizeObserver | null
    console.log("isResource", isResource)
    if (!isResource || (isResource && view === "day")) {
      let timeContent = document.querySelector(".rbc-time-content")
      timeContent && setContentWidth(timeContent?.getBoundingClientRect().width)
      observer = new ResizeObserver((entries) => {
        const { width } = entries[0].contentRect
        width && setContentWidth(width)
      })
    } else {
      timeContent && setContentWidth(timeContent?.scrollWidth)
      observer = new ResizeObserver((entries) => {
        const width = entries[0].target?.scrollWidth
        width && setContentWidth(width)
      })
    }
    if (timeContent) {
      observer.observe(timeContent)
    }
    return () => {
      if (timeContent && observer) {
        observer.unobserve(timeContent)
        timeContent = null
        observer = null
      }
    }
  }, [isResource, view])

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
    const intervalId = window.setInterval(setIndicator, 6000)
    return () => {
      if (isInWeekOrDay(view)) {
        clearInterval(intervalId)
      }
    }
  }, [slotHeight, view])

  return {
    slotHeight,
    indicatorTop,
    contentWidth,
    currentTime,
  }
}
