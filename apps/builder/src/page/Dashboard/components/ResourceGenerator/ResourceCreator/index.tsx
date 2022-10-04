import { FC } from "react"
import { ResourceCreatorProps } from "@/page/Dashboard/components/ResourceGenerator/ResourceCreator/interface"
import { MysqlLikeConfigElement } from "@/page/App/components/Actions/MysqlLikeConfigElement"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { RestApiConfigElement } from "@/page/App/components/Actions/RestApiConfigElement"
import { PostgreConfigElement } from "@/page/App/components/Actions/PostgreConfigElement"
import { RedisConfigElement } from "@/page/App/components/Actions/RedisConfigElement"

export const ResourceCreator: FC<ResourceCreatorProps> = (props) => {
  const { resourceType, resourceId, onBack, onFinished } = props
  const resource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceId === resourceId)
  })

  const finalResourceType = resource ? resource.resourceType : resourceType

  switch (finalResourceType) {
    case "tidb":
    case "mariadb":
    case "mysql":
      return (
        <MysqlLikeConfigElement
          resourceType={finalResourceType}
          resourceId={resourceId}
          onBack={() => {
            onBack("select")
          }}
          onFinished={onFinished}
        />
      )
    case "restapi":
      return (
        <RestApiConfigElement
          resourceId={resourceId}
          onBack={() => {
            onBack("select")
          }}
          onFinished={onFinished}
        />
      )
    case "mongodb":
      break
    case "redis":
      return (
        <RedisConfigElement
          resourceId={resourceId}
          onBack={() => {
            onBack("select")
          }}
          onFinished={onFinished}
        />
      )
    case "postgresql":
      return (
        <PostgreConfigElement
          resourceId={resourceId}
          onBack={() => {
            onBack("select")
          }}
          onFinished={onFinished}
        />
      )
  }
  return null
}
