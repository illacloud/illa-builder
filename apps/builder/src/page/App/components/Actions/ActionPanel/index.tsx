import { HTMLAttributes, forwardRef, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { ActionResult } from "@/page/App/components/Actions/ActionPanel/ActionResult"
import { ActionTitleBar } from "@/page/App/components/Actions/ActionPanel/ActionTitleBar"
import { DynamoDBPanel } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel"
import { ElasticSearchPanel } from "@/page/App/components/Actions/ActionPanel/ElasticSearchPanel"
import { FirebasePanel } from "@/page/App/components/Actions/ActionPanel/FirebasePanel"
import { GraphQLPanel } from "@/page/App/components/Actions/ActionPanel/GraphQLPanel"
import { HuggingFaceEndpointPanel } from "@/page/App/components/Actions/ActionPanel/HuggingFaceEndpointPanel"
import { HuggingFacePanel } from "@/page/App/components/Actions/ActionPanel/HuggingFacePanel"
import { MicrosoftSqlPanel } from "@/page/App/components/Actions/ActionPanel/MicrosoftSqlPanel"
import { MongoDbPanel } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel"
import { MysqlLikePanel } from "@/page/App/components/Actions/ActionPanel/MysqlLikePanel"
import { RedisPanel } from "@/page/App/components/Actions/ActionPanel/RedisPanel"
import { RestApiPanel } from "@/page/App/components/Actions/ActionPanel/RestApiPanel"
import { S3Panel } from "@/page/App/components/Actions/ActionPanel/S3Panel"
import { SMTPPanel } from "@/page/App/components/Actions/ActionPanel/SMTPPanel"
import { TransformerPanel } from "@/page/App/components/Actions/ActionPanel/TransformerPanel"
import {
  actionContentStyle,
  actionPanelStyle,
} from "@/page/App/components/Actions/ActionPanel/style"
import { getCachedAction } from "@/redux/config/configSelector"

export const ActionPanel = forwardRef<HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const cachedAction = useSelector(getCachedAction)

    const [resultVisible, setResultVisible] = useState(false)

    const panel = useMemo(() => {
      switch (cachedAction?.actionType) {
        case "clickhouse":
        case "supabasedb":
        case "mysql":
        case "tidb":
        case "mariadb":
        case "postgresql":
        case "snowflake":
          return <MysqlLikePanel />
        case "mssql":
          return <MicrosoftSqlPanel />
        case "restapi":
          return <RestApiPanel />
        case "huggingface":
          return <HuggingFacePanel />
        case "hfendpoint":
          return <HuggingFaceEndpointPanel />
        case "redis":
          return <RedisPanel />
        case "mongodb":
          return <MongoDbPanel />
        case "transformer":
          return <TransformerPanel />
        case "elasticsearch":
          return <ElasticSearchPanel />
        case "dynamodb":
          return <DynamoDBPanel />
        case "s3":
          return <S3Panel />
        case "smtp":
          return <SMTPPanel />
        case "firebase":
          return <FirebasePanel />
        case "graphql":
          return <GraphQLPanel />
        default:
          return <></>
      }
    }, [cachedAction])

    if (cachedAction === null || cachedAction === undefined) {
      return <></>
    }

    return (
      <div css={actionPanelStyle}>
        <ActionTitleBar
          onResultVisibleChange={(visible) => {
            setResultVisible(visible)
          }}
          openState={resultVisible}
        />
        <div css={actionContentStyle}>{panel}</div>
        <ActionResult
          visible={resultVisible}
          onClose={() => {
            setResultVisible(false)
          }}
        />
      </div>
    )
  },
)

ActionPanel.displayName = "ActionPanel"
