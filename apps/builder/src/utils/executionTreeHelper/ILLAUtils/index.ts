import { NotificationType, createNotification } from "@illa-design/react"
import { isValidUrlScheme } from "@/utils/typeHelper"

export const showNotification = (params: {
  type: NotificationType
  title: string
  description: string
  duration: number
}) => {
  const { type, title, description, duration = 4500 } = params
  const notification = createNotification()
  notification.show({
    title,
    content: description,
    duration,
    type,
  })
}

export const goToURL = (params: { url: string; newTab?: boolean }) => {
  const { url, newTab } = params
  let finalURL = url
  if (!finalURL) return
  if (!isValidUrlScheme(finalURL)) {
    finalURL = `https://${finalURL}`
  }
  if (newTab) {
    window.open(finalURL, "_blank")
  } else {
    window.location.assign(finalURL)
  }
}
