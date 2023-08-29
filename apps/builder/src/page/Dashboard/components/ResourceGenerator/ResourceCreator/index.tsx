import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { AirtableConfigElement } from "@/page/App/components/Actions/AirtableConfigElement"
import { AppWriteConfigElement } from "@/page/App/components/Actions/AppwriteConfigElement"
import { ClickhouseConfigElement } from "@/page/App/components/Actions/ClickhouseConfigElement"
import { CouchDBConfigElement } from "@/page/App/components/Actions/CouchDBConfigElement"
import { DynamoDBConfigElement } from "@/page/App/components/Actions/DynamoDBConfigElement"
import { ElasticSearchConfigElement } from "@/page/App/components/Actions/ElasticSearchConfigElement"
import { FirebaseConfigElement } from "@/page/App/components/Actions/FirebaseConfigElement"
import { GoogleSheetsConfigElement } from "@/page/App/components/Actions/GoogleSheetsConfigElement"
import { GraphQLConfigElement } from "@/page/App/components/Actions/GraphQLConfigElement"
import { HuggingFaceConfigElement } from "@/page/App/components/Actions/HuggingFaceConfigElement"
import { HuggingFaceEndpointConfigElement } from "@/page/App/components/Actions/HuggingFaceEndpointConfigElement"
import { MicrosoftSqlConfigElement } from "@/page/App/components/Actions/MicrosoftSqlConfigElement"
import { MongoDbConfigElement } from "@/page/App/components/Actions/MongoDbConfigElement"
import { MysqlLikeConfigElement } from "@/page/App/components/Actions/MysqlLikeConfigElement"
import { NeonConfigElement } from "@/page/App/components/Actions/NeonConfigElement"
import { OracleDBConfigElement } from "@/page/App/components/Actions/OracleDBConfigElement"
import { RedisConfigElement } from "@/page/App/components/Actions/RedisConfigElement"
import { RestApiConfigElement } from "@/page/App/components/Actions/RestApiConfigElement"
import { S3ConfigElement } from "@/page/App/components/Actions/S3ConfigElement"
import { SMTPConfigElement } from "@/page/App/components/Actions/SMTPConfigElement"
import { SnowflakeConfigElement } from "@/page/App/components/Actions/SnowflakeConfigElement"
import { ResourceCreatorProps } from "@/page/Dashboard/components/ResourceGenerator/ResourceCreator/interface"
import { RootState } from "@/store"

export const ResourceCreator: FC<ResourceCreatorProps> = (props) => {
  const { resourceType, resourceID, onBack, onFinished } = props
  const resource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })

  const finalResourceType = resource ? resource.resourceType : resourceType
  const handleBack = useCallback(() => onBack("select"), [onBack])

  const element = useMemo(() => {
    const configElementProps = {
      resourceID,
      onBack: handleBack,
      onFinished,
    }
    switch (finalResourceType) {
      case "supabasedb":
      case "tidb":
      case "mariadb":
      case "mysql":
      case "hydra":
      case "postgresql":
        return (
          <MysqlLikeConfigElement
            resourceType={finalResourceType}
            resourceID={resourceID}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "neon":
        return <NeonConfigElement {...configElementProps} />
      case "mssql":
        return <MicrosoftSqlConfigElement {...configElementProps} />
      case "oracle":
        return <OracleDBConfigElement {...configElementProps} />
      case "restapi":
        return (
          <RestApiConfigElement
            resourceID={resourceID}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "mongodb":
        return (
          <MongoDbConfigElement
            resourceID={resourceID}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "redis":
        return (
          <RedisConfigElement
            type="redis"
            resourceID={resourceID}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "upstash":
        return (
          <RedisConfigElement
            type="upstash"
            resourceID={resourceID}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "elasticsearch":
        return (
          <ElasticSearchConfigElement
            resourceID={resourceID}
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
            resourceID={resourceID}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "graphql":
        return <GraphQLConfigElement {...configElementProps} />
      case "s3":
        return (
          <S3ConfigElement
            resourceID={resourceID}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "smtp":
        return <SMTPConfigElement {...configElementProps} />
      case "googlesheets":
        return <GoogleSheetsConfigElement {...configElementProps} />
      case "huggingface":
        return <HuggingFaceConfigElement {...configElementProps} />
      case "hfendpoint":
        return <HuggingFaceEndpointConfigElement {...configElementProps} />
      case "clickhouse":
        return <ClickhouseConfigElement {...configElementProps} />
      case "appwrite":
        return <AppWriteConfigElement {...configElementProps} />
      case "couchdb":
        return <CouchDBConfigElement {...configElementProps} />
      case "airtable":
        return <AirtableConfigElement {...configElementProps} />
      default:
        return null
    }
  }, [resourceID, handleBack, onFinished, finalResourceType])

  return <>{element}</>
}
