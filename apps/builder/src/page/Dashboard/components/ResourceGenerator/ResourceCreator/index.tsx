import { FC, useCallback, useMemo } from "react"
import { ResourceCreatorProps } from "@/page/Dashboard/components/ResourceGenerator/ResourceCreator/interface"
import { MysqlLikeConfigElement } from "@/page/App/components/Actions/MysqlLikeConfigElement"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { RestApiConfigElement } from "@/page/App/components/Actions/RestApiConfigElement"
import { RedisConfigElement } from "@/page/App/components/Actions/RedisConfigElement"
import { MongoDbConfigElement } from "@/page/App/components/Actions/MongoDbConfigElement"
import { ElasticSearchConfigElement } from "@/page/App/components/Actions/ElasticSearchConfigElement"
import { S3ConfigElement } from "@/page/App/components/Actions/S3ConfigElement"

export const ResourceCreator: FC<ResourceCreatorProps> = (props) => {
  const { resourceType, resourceId, onBack, onFinished } = props
  const resource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceId === resourceId)
  })

  const finalResourceType = resource ? resource.resourceType : resourceType
  const handleBack = useCallback(() => onBack("select"), [onBack])

  const element = useMemo(() => {
    switch (finalResourceType) {
      case "tidb":
      case "mariadb":
      case "mysql":
      case "postgresql":
        return (
          <MysqlLikeConfigElement
            resourceType={finalResourceType}
            resourceId={resourceId}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "restapi":
        return (
          <RestApiConfigElement
            resourceId={resourceId}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "mongodb":
        return (
          <MongoDbConfigElement
            resourceId={resourceId}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "redis":
        return (
          <RedisConfigElement
            resourceId={resourceId}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "elasticsearch":
        return (
          <ElasticSearchConfigElement
            resourceId={resourceId}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "s3":
        return (
          <S3ConfigElement
            resourceId={resourceId}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      default:
        return null
    }
  }, [finalResourceType, onFinished, resourceId, handleBack])

  return <>{element}</>
}
