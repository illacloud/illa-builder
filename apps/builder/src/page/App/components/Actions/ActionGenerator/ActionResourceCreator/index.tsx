import { FC, ReactNode, useCallback, useMemo } from "react"
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
import { getAllResources } from "@/redux/resource/resourceSelector"
import { ResourceEditorProps } from "./interface"

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
    const generalProps = {
      onBack: handleBack,
      onFinished,
    }
    switch (resourceType) {
      case "firebase":
        return <FirebaseConfigElement {...generalProps} />
      case "clickhouse":
        return <ClickhouseConfigElement {...generalProps} />
      case "graphql":
        return <GraphQLConfigElement {...generalProps} />
      case "supabasedb":
      case "tidb":
      case "mariadb":
      case "mysql":
      case "hydra":
      case "postgresql":
        return (
          <MysqlLikeConfigElement
            resourceType={resourceType}
            onBack={handleBack}
            onFinished={onFinished}
          />
        )
      case "neon":
        return <NeonConfigElement {...generalProps} />
      case "mssql":
        return <MicrosoftSqlConfigElement {...generalProps} />
      case "oracle":
        return <OracleDBConfigElement {...generalProps} />
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
      case "dynamodb":
        return <DynamoDBConfigElement {...generalProps} />
      case "snowflake":
        return <SnowflakeConfigElement {...generalProps} />
      case "s3":
        return <S3ConfigElement onBack={handleBack} onFinished={onFinished} />
      case "upstash":
        return (
          <RedisConfigElement
            onBack={handleBack}
            onFinished={onFinished}
            type="upstash"
          />
        )
      case "redis":
        return (
          <RedisConfigElement
            onBack={handleBack}
            onFinished={onFinished}
            type="redis"
          />
        )
      case "smtp":
        return <SMTPConfigElement onBack={handleBack} onFinished={onFinished} />
      case "googlesheets":
        return <GoogleSheetsConfigElement {...generalProps} />
      case "huggingface":
        return <HuggingFaceConfigElement {...generalProps} />
      case "hfendpoint":
        return <HuggingFaceEndpointConfigElement {...generalProps} />
      case "couchdb":
        return <CouchDBConfigElement {...generalProps} />
      case "appwrite":
        return <AppWriteConfigElement {...generalProps} />
      case "airtable":
        return <AirtableConfigElement {...generalProps} />
      default:
        return null
    }
  }, [handleBack, onFinished, resourceType])

  return <>{renderElement}</>
}

ActionResourceCreator.displayName = "ActionResourceCreator"
