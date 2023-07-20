import { useCallback, useEffect, useState } from "react"
import { ROOT_PATH } from "@/widgetLibrary/DrivePickerWidget/constants"
import {
  getCurrentPath,
  removeSuffixPath,
} from "@/widgetLibrary/DrivePickerWidget/utils"

export const usePath = (
  path: string,
  allowAnonymousUse: boolean | undefined,
) => {
  const [totalPath, setTotalPath] = useState<string>(path || ROOT_PATH)
  const [currentPath, setCurrentPath] = useState<string>(
    getCurrentPath(totalPath),
  )

  const updatePath = useCallback(
    (changedPath: string) => {
      const curChangePath = removeSuffixPath(changedPath)
      setTotalPath(curChangePath)
      setCurrentPath(getCurrentPath(path, curChangePath))
    },
    [path],
  )

  useEffect(() => {
    if (allowAnonymousUse) {
      setTotalPath(ROOT_PATH)
      setCurrentPath(ROOT_PATH)
    } else {
      setTotalPath(path || ROOT_PATH)
      setCurrentPath(getCurrentPath(path || ROOT_PATH))
    }
  }, [allowAnonymousUse, path])

  return {
    currentPath,
    updatePath,
    totalPath,
  }
}
