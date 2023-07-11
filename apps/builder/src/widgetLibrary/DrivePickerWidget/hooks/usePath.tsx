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
  const [totalPath, setTotalPath] = useState<string>(removeSuffixPath(path))
  const [currentPath, setCurrentPath] = useState<string>(
    getCurrentPath(totalPath),
  )

  const updatePath = useCallback(
    (changedPath: string) => {
      setTotalPath(removeSuffixPath(changedPath))
      setCurrentPath(getCurrentPath(path, changedPath))
    },
    [path],
  )

  useEffect(() => {
    if (allowAnonymousUse) {
      setTotalPath(ROOT_PATH)
      setCurrentPath(ROOT_PATH)
    } else {
      setTotalPath(removeSuffixPath(path))
      setCurrentPath(removeSuffixPath(path))
    }
  }, [allowAnonymousUse, path])

  return {
    currentPath,
    updatePath,
    totalPath,
  }
}
