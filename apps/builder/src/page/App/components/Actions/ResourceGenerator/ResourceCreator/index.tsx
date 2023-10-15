import { ResourceType } from "@illa-public/public-types"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { AirtableConfigElement } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/AirtableConfigElement"
import { AppWriteConfigElement } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/AppwriteConfigElement"
import { ClickhouseConfigElement } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/ClickhouseConfigElement"
import { CouchDBConfigElement } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/CouchDBConfigElement"
import { DynamoDBConfigElement } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/DynamoDBConfigElement"
import { ElasticSearchConfigElement } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/ElasticSearchConfigElement"
import { FirebaseConfigElement } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/FirebaseConfigElement"
import { GoogleSheetsConfigElement } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/GoogleSheetsConfigElement"
import { GraphQLConfigElement } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/GraphQLConfigElement"
import { HuggingFaceConfigElement } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/HuggingFaceConfigElement"
import { HuggingFaceEndpointConfigElement } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/HuggingFaceEndpointConfigElement"
import { MicrosoftSqlConfigElement } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/MicrosoftSqlConfigElement"
import { MongoDbConfigElement } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/MongoDbConfigElement"
import { MysqlLikeConfigElement } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/MysqlLikeConfigElement"
import { NeonConfigElement } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/NeonConfigElement"
import { OracleDBConfigElement } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/OracleDBConfigElement"
import { RedisConfigElement } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/RedisConfigElement"
import { RestApiConfigElement } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/RestApiConfigElement"
import { S3ConfigElement } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/S3ConfigElement"
import { SMTPConfigElement } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/SMTPConfigElement"
import { SnowflakeConfigElement } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/SnowflakeConfigElement"
import { ResourceCreatorProps } from "@/page/App/components/Actions/ResourceGenerator/ResourceCreator/interface"
import { RootState } from "@/store"
import { ConfigElementProvider } from "../ConfigElements/provider"

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
            resourceType="redis"
            resourceID={resourceID}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "upstash":
        return (
          <RedisConfigElement
            resourceType="upstash"
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

  return (
    <ConfigElementProvider
      resourceType={finalResourceType as ResourceType}
      onFinished={onFinished}
      resourceID={resourceID}
    >
      {element}
    </ConfigElementProvider>
  )
}
