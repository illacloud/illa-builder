import { FC, useCallback, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import {
  ILLAProperties,
  ILLA_MIXPANEL_EVENT_TYPE,
  ILLA_MIXPANEL_PUBLIC_PAGE_NAME,
  ILLA_PAGE_NAME,
} from "@/illa-public-component/MixpanelUtils/interface"
import { MixpanelTrackProvider } from "@/illa-public-component/MixpanelUtils/mixpanelContext"
import { ActionResult } from "@/page/App/components/Actions/ActionPanel/ActionResult"
import { ActionTitleBar } from "@/page/App/components/Actions/ActionPanel/ActionTitleBar"
import { AirtablePanel } from "@/page/App/components/Actions/ActionPanel/AirtablePanel"
import { AppwritePanel } from "@/page/App/components/Actions/ActionPanel/AppwritePanel"
import { CouchDBPanel } from "@/page/App/components/Actions/ActionPanel/CouchDBPanel"
import { DynamoDBPanel } from "@/page/App/components/Actions/ActionPanel/DynamoDBPanel"
import { ElasticSearchPanel } from "@/page/App/components/Actions/ActionPanel/ElasticSearchPanel"
import { FirebasePanel } from "@/page/App/components/Actions/ActionPanel/FirebasePanel"
import { GoogleSheetsPanel } from "@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel"
import { GraphQLPanel } from "@/page/App/components/Actions/ActionPanel/GraphQLPanel"
import { HuggingFaceEndpointPanel } from "@/page/App/components/Actions/ActionPanel/HuggingFaceEndpointPanel"
import { HuggingFacePanel } from "@/page/App/components/Actions/ActionPanel/HuggingFacePanel"
import { MicrosoftSqlPanel } from "@/page/App/components/Actions/ActionPanel/MicrosoftSqlPanel"
import { MongoDbPanel } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel"
import { MysqlLikePanel } from "@/page/App/components/Actions/ActionPanel/MysqlLikePanel"
import { OracleDBPanel } from "@/page/App/components/Actions/ActionPanel/OracleDBPanel"
import { RedisPanel } from "@/page/App/components/Actions/ActionPanel/RedisPanel"
import { RestApiPanel } from "@/page/App/components/Actions/ActionPanel/RestApiPanel"
import { S3Panel } from "@/page/App/components/Actions/ActionPanel/S3Panel"
import { SMTPPanel } from "@/page/App/components/Actions/ActionPanel/SMTPPanel"
import { TransformerPanel } from "@/page/App/components/Actions/ActionPanel/TransformerPanel"
import {
  actionContentStyle,
  actionPanelContainerStyle,
  actionPanelStyle,
} from "@/page/App/components/Actions/ActionPanel/style"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { AdvancedPanel } from "../AdvancedPanel"

export const ActionPanel: FC = () => {
  const cachedAction = useSelector(getCachedAction)
  const selectedAction = useSelector(getSelectedAction)!

  const [resultVisible, setResultVisible] = useState(false)
  const [activeKey, setActiveKey] = useState("general")

  const handleClickChangeTab = useCallback(
    (activeKey: string) => {
      setActiveKey(activeKey)
      if (activeKey === "advanced") {
        trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
          element: "advanced_tab",
          parameter1: cachedAction?.actionType,
          parameter2: cachedAction,
        })
      }
      if (activeKey === "general") {
        trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
          element: "general_tab",
          parameter1: cachedAction?.actionType,
        })
      }
    },
    [cachedAction],
  )
  const basicTrack = useCallback(() => {
    return (
      event: ILLA_MIXPANEL_EVENT_TYPE,
      pageName: ILLA_PAGE_NAME,
      properties: Omit<ILLAProperties, "page">,
    ) => {
      trackInEditor(event, {
        parameter1: cachedAction?.actionType,
        parameter2: cachedAction,
        ...properties,
      })
    }
  }, [cachedAction])
  const panel = useMemo(() => {
    switch (cachedAction?.actionType) {
      case "clickhouse":
      case "supabasedb":
      case "mysql":
      case "tidb":
      case "mariadb":
      case "postgresql":
      case "snowflake":
      case "neon":
        return <MysqlLikePanel />
      case "mssql":
        return <MicrosoftSqlPanel />
      case "oracle":
        return <OracleDBPanel />
      case "restapi":
        return <RestApiPanel />
      case "huggingface":
        return <HuggingFacePanel />
      case "hfendpoint":
        return <HuggingFaceEndpointPanel />
      case "redis":
      case "upstash":
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
      case "googlesheets":
        return <GoogleSheetsPanel />
      case "firebase":
        return <FirebasePanel />
      case "graphql":
        return <GraphQLPanel />
      case "appwrite":
        return <AppwritePanel />
      case "couchdb":
        return <CouchDBPanel />
      case "airtable":
        return <AirtablePanel />
      default:
        return <></>
    }
  }, [cachedAction])

  if (cachedAction === null || cachedAction === undefined) {
    return <></>
  }

  return (
    <div css={actionPanelStyle}>
      <div css={actionPanelContainerStyle}>
        <ActionTitleBar
          onResultVisibleChange={(visible) => {
            setResultVisible(visible)
          }}
          openState={resultVisible}
          activeTab={activeKey}
          handleChangeTab={handleClickChangeTab}
        />
        {activeKey === "general" && <div css={actionContentStyle}>{panel}</div>}
        {activeKey === "advanced" && (
          <MixpanelTrackProvider
            basicTrack={basicTrack}
            pageName={ILLA_MIXPANEL_PUBLIC_PAGE_NAME.PLACEHOLDER}
          >
            <AdvancedPanel />
          </MixpanelTrackProvider>
        )}
        <ActionResult
          key={selectedAction.actionId}
          visible={resultVisible}
          onClose={() => {
            setResultVisible(false)
          }}
        />
      </div>
    </div>
  )
}

ActionPanel.displayName = "ActionPanel"
