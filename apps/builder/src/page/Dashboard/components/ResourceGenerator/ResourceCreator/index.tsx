import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { ElasticSearchConfigElement } from "@/page/App/components/Actions/ElasticSearchConfigElement"
import { MongoDbConfigElement } from "@/page/App/components/Actions/MongoDbConfigElement"
import { MysqlLikeConfigElement } from "@/page/App/components/Actions/MysqlLikeConfigElement"
import { RedisConfigElement } from "@/page/App/components/Actions/RedisConfigElement"
import { RestApiConfigElement } from "@/page/App/components/Actions/RestApiConfigElement"
import { S3ConfigElement } from "@/page/App/components/Actions/S3ConfigElement"
import { SMTPConfigElement } from "@/page/App/components/Actions/SMTPConfigElement"
import { ResourceCreatorProps } from "@/page/Dashboard/components/ResourceGenerator/ResourceCreator/interface"
import { RootState } from "@/store"
import { FirebaseConfigElement } from "@/page/App/components/Actions/FirebaseConfigElement"
import { ClickhouseConfigElement } from "@/page/App/components/Actions/ClickhouseConfigElement"
import { GraphQLConfigElement } from "@/page/App/components/Actions/GraphQLConfigElement"

export const ResourceCreator: FC<ResourceCreatorProps> = (props) => {
  const { resourceType, resourceId, onBack, onFinished } = props
  const resource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceId === resourceId)
  })

  const finalResourceType = resource ? resource.resourceType : resourceType
  const handleBack = useCallback(() => onBack("select"), [onBack])

  const element = useMemo(() => {
    const configElementProps = {
      resourceId,
      onBack: handleBack,
      onFinished,
    }
    switch (finalResourceType) {
      case "supabasedb":
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
      case "firebase":
        return (
          <FirebaseConfigElement
            resourceId={resourceId}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "graphql":
        return <GraphQLConfigElement {...configElementProps} />
      case "s3":
        return (
          <S3ConfigElement
            resourceId={resourceId}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "smtp":
        return <SMTPConfigElement {...configElementProps} />
      case "clickhouse":
        return <ClickhouseConfigElement {...configElementProps} />
      default:
        return null
    }
  }, [finalResourceType, onFinished, resourceId, handleBack])

  return <>{element}</>
}
