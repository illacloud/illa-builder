import { FC, useCallback, useContext, useMemo } from "react"
import { Breadcrumb, BreadcrumbItem } from "@illa-design/react"
import { DriveFileSelectContext, ROOT_PATH } from "@/components/DriveFileSelect"

const FileBreadCrumb: FC = () => {
  const { currentPath, totalPath, updatePath } = useContext(
    DriveFileSelectContext,
  )

  const handleClickBreadcrumb = useCallback(
    (path: string, last: boolean) => {
      if (last) {
        return
      }
      updatePath(path)
    },
    [updatePath],
  )

  const breadList = useMemo(() => {
    if (!currentPath) {
      return [
        {
          path: ROOT_PATH,
          title: ROOT_PATH,
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
        path,
        title: item,
        last: isLast,
      }
    })
  }, [currentPath, totalPath])

  return (
    <Breadcrumb
      flexWrap="wrap"
      onClickPath={handleClickBreadcrumb}
      blockRouterChange
    >
      {breadList.map((item, index) => (
        <BreadcrumbItem last={item.last ?? false} key={index} href={item.path}>
          {item.title}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}

export default FileBreadCrumb
