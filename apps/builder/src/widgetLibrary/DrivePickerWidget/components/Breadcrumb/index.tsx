import { FC, useCallback, useContext, useMemo } from "react"
import { Breadcrumb, BreadcrumbItem } from "@illa-design/react"
import { ROOT_PATH } from "@/widgetLibrary/DrivePickerWidget/constants"
import { DrivePickerContext } from "@/widgetLibrary/DrivePickerWidget/context"
import { spanBreadcrumbItemStyle } from "./style"

export const FileBreadCrumb: FC = () => {
  const { currentPath, totalPath, updatePath } = useContext(DrivePickerContext)

  const handleClickBreadcrumb = useCallback(
    (path: string, last: boolean) => {
      if (last) {
        return
      }
      return () => {
        updatePath(path)
      }
    },
    [updatePath],
  )

  const breadList = useMemo(() => {
    if (!currentPath) {
      return [
        {
          title: <span css={spanBreadcrumbItemStyle(true)}>{ROOT_PATH}</span>,
          last: true,
        },
      ]
    }

    return currentPath?.split("/").map((item, index, array) => {
      const breadcrumbPath = array.slice(0, index + 1).join("/")
      const limitPath = totalPath.split(breadcrumbPath)[0]
      const path = `${limitPath}${breadcrumbPath}`
      const isLast = index === array.length - 1
      return {
        title: (
          <span
            css={spanBreadcrumbItemStyle(isLast)}
            onClick={handleClickBreadcrumb(path, isLast)}
          >
            {item}
          </span>
        ),
        last: isLast,
      }
    })
  }, [currentPath, totalPath, handleClickBreadcrumb])

  return (
    <Breadcrumb flexWrap="wrap">
      {breadList.map((item, index) => (
        <BreadcrumbItem last={item.last ?? false} key={index}>
          {item.title}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}
