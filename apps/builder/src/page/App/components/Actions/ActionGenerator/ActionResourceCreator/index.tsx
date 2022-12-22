import { FC, ReactNode, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { ElasticSearchConfigElement } from "@/page/App/components/Actions/ElasticSearchConfigElement"
import { MongoDbConfigElement } from "@/page/App/components/Actions/MongoDbConfigElement"
import { MysqlLikeConfigElement } from "@/page/App/components/Actions/MysqlLikeConfigElement"
import { RedisConfigElement } from "@/page/App/components/Actions/RedisConfigElement"
import { RestApiConfigElement } from "@/page/App/components/Actions/RestApiConfigElement"
import { S3ConfigElement } from "@/page/App/components/Actions/S3ConfigElement"
import { SMTPConfigElement } from "@/page/App/components/Actions/SMTPConfigElement"
import { FirebaseConfigElement } from "@/page/App/components/Actions/FirebaseConfigElement"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { ResourceEditorProps } from "./interface"
import { ClickhouseConfigElement } from "@/page/App/components/Actions/ClickhouseConfigElement"
import { GraphQLConfigElement } from "@/page/App/components/Actions/GraphQLConfigElement"

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
      case "s3":
        return <S3ConfigElement onBack={handleBack} onFinished={onFinished} />
      case "redis":
        return (
          <RedisConfigElement onBack={handleBack} onFinished={onFinished} />
        )
      case "smtp":
        return <SMTPConfigElement onBack={handleBack} onFinished={onFinished} />
      default:
        return null
    }
  }, [handleBack, onFinished, resourceType])

  return <>{renderElement}</>
}

ActionResourceCreator.displayName = "ActionResourceCreator"
