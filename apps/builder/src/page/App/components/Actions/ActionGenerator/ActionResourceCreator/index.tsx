import { FC, ReactNode } from "react"
import { ResourceEditorProps } from "./interface"
import { useSelector } from "react-redux"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { MysqlConfigElement } from "@/page/App/components/Actions/MysqlConfigElement"

export const ActionResourceCreator: FC<ResourceEditorProps> = (props) => {
  const { onBack, onFinished, resourceType } = props

  const resourceList = useSelector(getAllResources)
    .filter((r) => r.resourceType == resourceType)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )

  let renderElement: ReactNode = null
  switch (resourceType) {
    case "mysql":
      renderElement = (
        <MysqlConfigElement
          onBack={() => {
            if (resourceList.length > 0) {
              onBack("createAction")
            } else {
              onBack("select")
            }
          }}
          onFinished={onFinished}
        />
      )
      break
    case "restapi":
      break
    case "mongodb":
      break
    case "redis":
      break
    case "postgresql":
      break
    default:
      break
  }

  return <>{renderElement}</>
}

ActionResourceCreator.displayName = "ActionResourceCreator"
