import { useCallback, useEffect, useState } from "react"
import {
  getCurrentPath,
  removeSuffixPath,
} from "@/components/DriveFileSelect/utils"

export const usePath = (
  path: string,
  rootPath: string,
  allowAnonymousUse?: boolean | undefined,
) => {
  const [totalPath, setTotalPath] = useState<string>(path || rootPath)
  const [currentPath, setCurrentPath] = useState<string>(
    getCurrentPath(totalPath ?? "root"),
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
      setTotalPath(rootPath)
      setCurrentPath(rootPath)
    } else {
      setTotalPath(path || rootPath)
      setCurrentPath(getCurrentPath(path || rootPath))
    }
  }, [rootPath, allowAnonymousUse, path])

  return {
    currentPath,
    updatePath,
    totalPath,
  }
}
