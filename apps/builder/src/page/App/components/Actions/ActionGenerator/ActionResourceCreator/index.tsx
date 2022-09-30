import { FC, ReactNode } from "react"
import { ResourceEditorProps } from "./interface"
import { useSelector } from "react-redux"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { MysqlLikeConfigElement } from "@/page/App/components/Actions/MysqlLikeConfigElement"
import { RestApiConfigElement } from "@/page/App/components/Actions/RestApiConfigElement"
import { PostgreConfigElement } from "@/page/App/components/Actions/PostgreConfigElement"
import { RedisConfigElement } from "@/page/App/components/Actions/RedisConfigElement"

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
    case "tidb":
    case "mariadb":
    case "mysql":
      renderElement = (
        <MysqlLikeConfigElement
          resourceType={resourceType}
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
      renderElement = (
        <RestApiConfigElement
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
    case "redis":
      renderElement = (
        <RedisConfigElement
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
    case "postgresql":
      renderElement = (
        <PostgreConfigElement
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
    default:
      break
  }

  return <>{renderElement}</>
}

ActionResourceCreator.displayName = "ActionResourceCreator"
