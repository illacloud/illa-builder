import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { ClickhouseConfigElement } from "@/page/App/components/Actions/ClickhouseConfigElement"
import { DynamoDBConfigElement } from "@/page/App/components/Actions/DynamoDBConfigElement"
import { ElasticSearchConfigElement } from "@/page/App/components/Actions/ElasticSearchConfigElement"
import { FirebaseConfigElement } from "@/page/App/components/Actions/FirebaseConfigElement"
import { GraphQLConfigElement } from "@/page/App/components/Actions/GraphQLConfigElement"
import { HuggingFaceConfigElement } from "@/page/App/components/Actions/HuggingFaceConfigElement"
import { HuggingFaceEndpointConfigElement } from "@/page/App/components/Actions/HuggingFaceEndpointConfigElement"
import { MicrosoftSqlConfigElement } from "@/page/App/components/Actions/MicrosoftSqlConfigElement"
import { MongoDbConfigElement } from "@/page/App/components/Actions/MongoDbConfigElement"
import { MysqlLikeConfigElement } from "@/page/App/components/Actions/MysqlLikeConfigElement"
import { RedisConfigElement } from "@/page/App/components/Actions/RedisConfigElement"
import { RestApiConfigElement } from "@/page/App/components/Actions/RestApiConfigElement"
import { S3ConfigElement } from "@/page/App/components/Actions/S3ConfigElement"
import { SMTPConfigElement } from "@/page/App/components/Actions/SMTPConfigElement"
import { SnowflakeConfigElement } from "@/page/App/components/Actions/SnowflakeConfigElement"
import { ResourceCreatorProps } from "@/page/Dashboard/components/ResourceGenerator/ResourceCreator/interface"
import { RootState } from "@/store"

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
      case "mssql":
        return <MicrosoftSqlConfigElement {...configElementProps} />
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
      case "dynamodb":
        return <DynamoDBConfigElement {...configElementProps} />
      case "snowflake":
        return <SnowflakeConfigElement {...configElementProps} />
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
      case "huggingface":
        return <HuggingFaceConfigElement {...configElementProps} />
      case "hfendpoint":
        return <HuggingFaceEndpointConfigElement {...configElementProps} />
      case "clickhouse":
        return <ClickhouseConfigElement {...configElementProps} />
      default:
        return null
    }
  }, [finalResourceType, onFinished, resourceId, handleBack])

  return <>{element}</>
}
