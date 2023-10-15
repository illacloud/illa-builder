import { ResourceType } from "@illa-public/public-types"
import { isCloudVersion } from "@illa-public/utils"
import { FC } from "react"
import { useSelector } from "react-redux"
import { Navigate, useParams } from "react-router-dom"
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
import { getAllResources } from "@/redux/resource/resourceSelector"
import { Header } from "../components/resourceHeader"
import { WhiteList } from "../components/whiteList"
import { containerStyle, innerContainerStyle } from "./style"

export const ResourceEdit: FC = () => {
  const { resourceID } = useParams()

  const resourceList = useSelector(getAllResources)

  const resource = resourceList.find((r) => r.resourceID === resourceID)

  if (!resource) {
    return <Navigate to="/404" />
  }

  const resourceType = resource.resourceType
  const onBack = () => {}
  const onFinished = () => {}

  let element = null

  const basicProps = {
    onBack,
    onFinished,
    resourceID: resourceID,
    hasFooter: false,
  }
  switch (resourceType) {
    case "supabasedb":
    case "tidb":
    case "mariadb":
    case "mysql":
    case "hydra":
    case "postgresql": {
      element = (
        <MysqlLikeConfigElement resourceType={resourceType} {...basicProps} />
      )
      break
    }
    case "neon": {
      element = <NeonConfigElement {...basicProps} />
      break
    }
    case "mssql": {
      element = <MicrosoftSqlConfigElement {...basicProps} />
      break
    }
    case "oracle": {
      element = <OracleDBConfigElement {...basicProps} />
      break
    }
    case "restapi": {
      element = <RestApiConfigElement {...basicProps} />
      break
    }
    case "mongodb": {
      element = <MongoDbConfigElement {...basicProps} />
      break
    }
    case "upstash":
    case "redis": {
      element = (
        <RedisConfigElement resourceType={resourceType} {...basicProps} />
      )
      break
    }
    case "elasticsearch": {
      element = <ElasticSearchConfigElement {...basicProps} />
      break
    }
    case "dynamodb": {
      element = <DynamoDBConfigElement {...basicProps} />
      break
    }
    case "snowflake": {
      element = <SnowflakeConfigElement {...basicProps} />
      break
    }
    case "firebase": {
      element = <FirebaseConfigElement {...basicProps} />
      break
    }
    case "graphql": {
      element = <GraphQLConfigElement {...basicProps} />
      break
    }
    case "s3": {
      element = <S3ConfigElement {...basicProps} />
      break
    }
    case "smtp": {
      element = <SMTPConfigElement {...basicProps} />
      break
    }
    case "googlesheets": {
      element = <GoogleSheetsConfigElement {...basicProps} />
      break
    }
    case "huggingface": {
      element = <HuggingFaceConfigElement {...basicProps} />
      break
    }
    case "hfendpoint": {
      element = <HuggingFaceEndpointConfigElement {...basicProps} />
      break
    }
    case "clickhouse": {
      element = <ClickhouseConfigElement {...basicProps} />
      break
    }
    case "appwrite": {
      element = <AppWriteConfigElement {...basicProps} />
      break
    }
    case "couchdb": {
      element = <CouchDBConfigElement {...basicProps} />
      break
    }
    case "airtable": {
      element = <AirtableConfigElement {...basicProps} />
      break
    }
  }

  const handleOnFinished = () => {
    setTimeout(() => {
      window.close()
    }, 3000)
  }

  return (
    <ConfigElementProvider
      resourceType={resourceType as ResourceType}
      resourceID={resourceID}
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
