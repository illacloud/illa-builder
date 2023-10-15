import { ResourceType } from "@illa-public/public-types"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useMemo } from "react"
import { useParams } from "react-router-dom"
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
import { ConfigElementProvider } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/provider"
import { Header } from "../components/resourceHeader"
import { WhiteList } from "../components/whiteList"
import { containerStyle, innerContainerStyle } from "./style"

export const ResourceCreate: FC = () => {
  const { resourceType } = useParams()

  const onBack = () => {}
  const onFinished = () => {}

  const element = useMemo(() => {
    const basicProps = {
      onBack,
      onFinished,
      hasFooter: false,
    }
    switch (resourceType) {
      case "supabasedb":
      case "tidb":
      case "mariadb":
      case "mysql":
      case "hydra":
      case "postgresql":
        return (
          <MysqlLikeConfigElement resourceType={resourceType} {...basicProps} />
        )
      case "neon":
        return <NeonConfigElement {...basicProps} />
      case "mssql":
        return <MicrosoftSqlConfigElement {...basicProps} />
      case "oracle":
        return <OracleDBConfigElement {...basicProps} />
      case "restapi":
        return <RestApiConfigElement {...basicProps} />
      case "mongodb":
        return <MongoDbConfigElement {...basicProps} />
      case "upstash":
      case "redis":
        return (
          <RedisConfigElement resourceType={resourceType} {...basicProps} />
        )
      case "elasticsearch":
        return <ElasticSearchConfigElement {...basicProps} />
      case "dynamodb":
        return <DynamoDBConfigElement {...basicProps} />
      case "snowflake":
        return <SnowflakeConfigElement {...basicProps} />
      case "firebase":
        return <FirebaseConfigElement {...basicProps} />
      case "graphql":
        return <GraphQLConfigElement {...basicProps} />
      case "s3":
        return <S3ConfigElement {...basicProps} />
      case "smtp":
        return <SMTPConfigElement {...basicProps} />
      case "googlesheets":
        return <GoogleSheetsConfigElement {...basicProps} />
      case "huggingface":
        return <HuggingFaceConfigElement {...basicProps} />
      case "hfendpoint":
        return <HuggingFaceEndpointConfigElement {...basicProps} />
      case "clickhouse":
        return <ClickhouseConfigElement {...basicProps} />
      case "appwrite":
        return <AppWriteConfigElement {...basicProps} />
      case "couchdb":
        return <CouchDBConfigElement {...basicProps} />
      case "airtable":
        return <AirtableConfigElement {...basicProps} />
      default:
        return null
    }
  }, [resourceType])

  const handleOnFinished = () => {
    setTimeout(() => {
      window.close()
    }, 3000)
  }

  return (
    <ConfigElementProvider
      resourceType={resourceType as ResourceType}
      onFinished={handleOnFinished}
    >
      <div css={innerContainerStyle}>
        <Header resourceType={resourceType as ResourceType} />

        <div css={containerStyle}>
          {element}
          {isCloudVersion && <WhiteList />}
        </div>
      </div>
    </ConfigElementProvider>
  )
}
