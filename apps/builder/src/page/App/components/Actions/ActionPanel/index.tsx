import {
  ILLAProperties,
  ILLA_MIXPANEL_EVENT_TYPE,
  ILLA_MIXPANEL_PUBLIC_PAGE_NAME,
  ILLA_PAGE_NAME,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
import { INIT_ACTION_MOCK_CONFIG } from "@illa-public/public-configs"
import { Suspense, lazy } from "react"
import { FC, useCallback, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { ActionResult } from "@/page/App/components/Actions/ActionPanel/ActionResult"
import { ActionTitleBar } from "@/page/App/components/Actions/ActionPanel/ActionTitleBar"
import {
  actionContentStyle,
  actionPanelContainerStyle,
  actionPanelStyle,
  outterActionContainerStyle,
} from "@/page/App/components/Actions/ActionPanel/style"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { trackInEditor } from "@/utils/mixpanelHelper"
import WidgetLoading from "@/widgetLibrary/PublicSector/WidgetLoading"
import { SQLModeTipProvider } from "../Context/SqlModeTipContext"
import ActionMockPanel from "./ActionMockPanel"
import GeneralPanelLayout from "./Layout/GeneralPanelLayout"

const AdvancedPanel = lazy(
  () => import("@/page/App/components/Actions/AdvancedPanel"),
)

const AirtablePanel = lazy(
  () => import("@/page/App/components/Actions/ActionPanel/AirtablePanel"),
)
const AppwritePanel = lazy(
  () => import("@/page/App/components/Actions/ActionPanel/AppwritePanel"),
)
const CouchDBPanel = lazy(
  () => import("@/page/App/components/Actions/ActionPanel/CouchDBPanel"),
)
const DynamoDBPanel = lazy(
  () => import("@/page/App/components/Actions/ActionPanel/DynamoDBPanel"),
)
const ElasticSearchPanel = lazy(
  () => import("@/page/App/components/Actions/ActionPanel/ElasticSearchPanel"),
)
const FirebasePanel = lazy(
  () => import("@/page/App/components/Actions/ActionPanel/FirebasePanel"),
)
const GoogleSheetsPanel = lazy(
  () => import("@/page/App/components/Actions/ActionPanel/GoogleSheetsPanel"),
)
const GraphQLPanel = lazy(
  () => import("@/page/App/components/Actions/ActionPanel/GraphQLPanel"),
)
const HuggingFaceEndpointPanel = lazy(
  () =>
    import(
      "@/page/App/components/Actions/ActionPanel/HuggingFaceEndpointPanel"
    ),
)
const HuggingFacePanel = lazy(
  () => import("@/page/App/components/Actions/ActionPanel/HuggingFacePanel"),
)
const MicrosoftSqlPanel = lazy(
  () => import("@/page/App/components/Actions/ActionPanel/MicrosoftSqlPanel"),
)
const MongoDbPanel = lazy(
  () => import("@/page/App/components/Actions/ActionPanel/MongoDbPanel"),
)
const MysqlLikePanel = lazy(
  () => import("@/page/App/components/Actions/ActionPanel/MysqlLikePanel"),
)
const OracleDBPanel = lazy(
  () => import("@/page/App/components/Actions/ActionPanel/OracleDBPanel"),
)
const RedisPanel = lazy(
  () => import("@/page/App/components/Actions/ActionPanel/RedisPanel"),
)
const RestApiPanel = lazy(
  () => import("@/page/App/components/Actions/ActionPanel/RestApiPanel"),
)
const S3Panel = lazy(
  () => import("@/page/App/components/Actions/ActionPanel/S3Panel"),
)
const SMTPPanel = lazy(
  () => import("@/page/App/components/Actions/ActionPanel/SMTPPanel"),
)
const TransformerPanel = lazy(
  () => import("@/page/App/components/Actions/ActionPanel/TransformerPanel"),
)
const AIAgentPanel = lazy(
  () => import("@/page/App/components/Actions/ActionPanel/AIAgentPanel"),
)

const GlobalDataPanel = lazy(
  () => import("@/page/App/components/Actions/ActionPanel/GlobalDataPanel"),
)

const ILLADrivePanel = lazy(
  () => import("@/page/App/components/Actions/ActionPanel/ILLADrivePanel"),
)

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

  const mockConfig = cachedAction?.config?.mockConfig ?? INIT_ACTION_MOCK_CONFIG

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
      case "hydra":
        return <MysqlLikePanel />
      case "mssql":
        return <MicrosoftSqlPanel />
      case "oracle":
      case "oracle9i":
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
      case "aiagent":
        return <AIAgentPanel />
      case "globalData":
        return <GlobalDataPanel />
      case "illadrive":
        return <ILLADrivePanel />
      default:
        return <></>
    }
  }, [cachedAction])

  if (!cachedAction) {
    return <></>
  }

  return (
    <div css={actionPanelStyle}>
      <SQLModeTipProvider>
        <div css={actionPanelContainerStyle}>
          <ActionTitleBar
            onResultVisibleChange={(visible) => {
              setResultVisible(visible)
            }}
            openState={resultVisible}
            activeTab={activeKey}
            handleChangeTab={handleClickChangeTab}
          />
          <Suspense fallback={<WidgetLoading />}>
            {activeKey === "general" && (
              <div css={outterActionContainerStyle}>
                <GeneralPanelLayout
                  actionType={cachedAction?.actionType}
                  mockEnabled={mockConfig?.enabled}
                >
                  {mockConfig?.enabled ? (
                    <ActionMockPanel
                      enableForReleasedApp={mockConfig.enableForReleasedApp}
                      mockData={mockConfig.mockData}
                    />
                  ) : (
                    <div css={actionContentStyle}>{panel}</div>
                  )}
                </GeneralPanelLayout>
              </div>
            )}
            {activeKey === "advanced" && (
              <MixpanelTrackProvider
                basicTrack={basicTrack}
                pageName={ILLA_MIXPANEL_PUBLIC_PAGE_NAME.PLACEHOLDER}
              >
                <AdvancedPanel />
              </MixpanelTrackProvider>
            )}
          </Suspense>
          {resultVisible && (
            <ActionResult
              key={selectedAction?.actionID}
              visible={resultVisible}
              onClose={() => {
                setResultVisible(false)
              }}
            />
          )}
        </div>
      </SQLModeTipProvider>
    </div>
  )
}

ActionPanel.displayName = "ActionPanel"
