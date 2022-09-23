import { FC, ReactNode } from "react"
import { ResourceCreatorProps } from "@/page/Dashboard/components/ResourceGenerator/ResourceCreator/interface"
import { MysqlConfigElement } from "@/page/App/components/Actions/MysqlConfigElement"

export const ResourceCreator: FC<ResourceCreatorProps> = (props) => {
  const { resourceType, resourceId, onBack, onFinished } = props

  let resourceElement: ReactNode

  switch (resourceType) {
    case "mysql":
      resourceElement = (
        <MysqlConfigElement
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
