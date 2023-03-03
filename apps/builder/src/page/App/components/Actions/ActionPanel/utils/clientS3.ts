export const isValidBase64 = (str: string) => {
  try {
    window.atob(str)
    return true
  } catch (e) {
    return false
  }
}

export const downloadActionResult = (
  contentType: string,
  fileName: string,
  data: string,
) => {
  const isBase64 = isValidBase64(data)
  const isDownloadBase64 = isBase64 && !!contentType
  let href = ""
  if (!isDownloadBase64) {
    const blob = new Blob([data], { type: contentType })
    href = URL.createObjectURL(blob)
  }
  const a = document.createElement("a")
  a.download = fileName
  a.style.display = "none"
  a.href = isDownloadBase64 ? `data:${contentType};base64,${data}` : href
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
