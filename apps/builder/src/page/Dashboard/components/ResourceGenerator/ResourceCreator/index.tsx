import { FC, ReactNode } from "react"
import { ResourceCreatorProps } from "@/page/Dashboard/components/ResourceGenerator/ResourceCreator/interface"
import { MysqlConfigElement } from "@/page/App/components/Actions/MysqlConfigElement"
import { useSelector } from "react-redux"
import { RootState } from "@/store"

export const ResourceCreator: FC<ResourceCreatorProps> = (props) => {
  const { resourceType, resourceId, onBack, onFinished } = props

  let resourceElement: ReactNode

  const resource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceId === resourceId)
  })

  const finalResourceType = resource ? resource.resourceType : resourceType

  switch (finalResourceType) {
    case "mysql":
      resourceElement = (
        <MysqlConfigElement
          resourceId={resourceId}
          onBack={() => {
            onBack("select")
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
  }

  return <>{resourceElement}</>
}
