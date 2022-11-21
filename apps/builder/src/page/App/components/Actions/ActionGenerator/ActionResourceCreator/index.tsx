import { FC, ReactNode, useMemo, useCallback } from "react"
import { ResourceEditorProps } from "./interface"
import { useSelector } from "react-redux"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { MysqlLikeConfigElement } from "@/page/App/components/Actions/MysqlLikeConfigElement"
import { RestApiConfigElement } from "@/page/App/components/Actions/RestApiConfigElement"
import { MongoDbConfigElement } from "@/page/App/components/Actions/MongoDbConfigElement"
import { RedisConfigElement } from "@/page/App/components/Actions/RedisConfigElement"
import { ElasticSearchConfigElement } from "@/page/App/components/Actions/ElasticSearchConfigElement"

export const ActionResourceCreator: FC<ResourceEditorProps> = (props) => {
  const { onBack, onFinished, resourceType } = props

  const resourceList = useSelector(getAllResources)
    .filter((r) => r.resourceType == resourceType)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )

  const handleBack = useCallback(() => {
    if (resourceList.length > 0) {
      onBack("createAction")
    } else {
      onBack("select")
    }
  }, [onBack, resourceList.length])

  let renderElement: ReactNode | null = useMemo(() => {
    switch (resourceType) {
      case "tidb":
      case "mariadb":
      case "mysql":
      case "postgresql":
        return (
          <MysqlLikeConfigElement
            resourceType={resourceType}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "restapi":
        return (
          <RestApiConfigElement onBack={handleBack} onFinished={onFinished} />
        )
      case "mongodb":
        return (
          <MongoDbConfigElement onBack={handleBack} onFinished={onFinished} />
        )
      case "elasticsearch":
        return (
          <ElasticSearchConfigElement
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "redis":
        return (
          <RedisConfigElement onBack={handleBack} onFinished={onFinished} />
        )
      default:
        return null
    }
  }, [handleBack, onFinished, resourceType])

  return <>{renderElement}</>
}

ActionResourceCreator.displayName = "ActionResourceCreator"
