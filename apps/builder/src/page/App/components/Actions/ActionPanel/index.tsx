import {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
  useImperativeHandle,
} from "react"
import { useSelector } from "react-redux"
import { ActionResult } from "@/page/App/components/Actions/ActionPanel/ActionResult"
import { ActionResultType } from "@/page/App/components/Actions/ActionPanel/ActionResult/interface"
import { ActionTitleBar } from "@/page/App/components/Actions/ActionPanel/ActionTitleBar"
import { ElasticSearchPanel } from "@/page/App/components/Actions/ActionPanel/ElasticSearchPanel"
import { MongoDbPanel } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel"
import { RedisPanel } from "@/page/App/components/Actions/ActionPanel/RedisPanel"
import { RestApiPanel } from "@/page/App/components/Actions/ActionPanel/RestApiPanel"
import { S3Panel } from "@/page/App/components/Actions/ActionPanel/S3Panel"
import { SMTPPanel } from "@/page/App/components/Actions/ActionPanel/SMTPPanel"
import { TransformerPanel } from "@/page/App/components/Actions/ActionPanel/TransformerPanel"
import { ActionPanelContext } from "@/page/App/components/Actions/ActionPanel/actionPanelContext"
import {
  ActionPanelContainerProps,
  ActionPanelFunctionProps,
} from "@/page/App/components/Actions/ActionPanel/interface"
import {
  actionContentStyle,
  actionPanelStyle,
} from "@/page/App/components/Actions/ActionPanel/style"
import { getCachedAction } from "@/redux/config/configSelector"
import { MysqlLikePanel } from "@/page/App/components/Actions/ActionPanel/MysqlLikePanel"
import { FirebasePanel } from "@/page/App/components/Actions/ActionPanel/FirebasePanel"

export const ActionPanel = forwardRef<
  ActionPanelFunctionProps,
  ActionPanelContainerProps
>((props, ref) => {
  const { maxHeight } = props
  const panelRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const actionResultRef = useRef<HTMLDivElement>(null)
  const cachedAction = useSelector(getCachedAction)
  const [actionResult, setActionResult] = useState<ActionResultType>()

  const clearActionResult = () => {
    setActionResult(undefined)
    if (contentRef.current) {
      contentRef.current.style.paddingBottom = "48px"
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      clearActionResult,
    }),
    [],
  )

  const run = (result: unknown, error?: boolean) => {
    if (actionResult && actionResultRef.current) {
      actionResultRef.current.style.height = "auto"
    }
    setActionResult({ result, error })
  }

  const panel = useMemo(() => {
    switch (cachedAction?.actionType) {
      case "clickhouse":
      case "supabasedb":
      case "mysql":
      case "tidb":
      case "mariadb":
      case "postgresql":
        return <MysqlLikePanel />
      case "restapi":
        return <RestApiPanel />
      case "redis":
        return <RedisPanel />
      case "mongodb":
        return <MongoDbPanel />
      case "transformer":
        return <TransformerPanel />
      case "elasticsearch":
        return <ElasticSearchPanel />
      case "s3":
        return <S3Panel />
      case "smtp":
        return <SMTPPanel />
      case "firebase":
        return <FirebasePanel />
      default:
        return <></>
    }
  }, [cachedAction])

  if (cachedAction === null || cachedAction === undefined) {
    return <></>
  }

  return (
    <div css={actionPanelStyle} ref={panelRef}>
      <ActionPanelContext.Provider
        value={{
          onChangeSelectedResource: clearActionResult,
        }}
      >
        <ActionTitleBar onActionRun={run} />
        <div ref={contentRef} css={actionContentStyle}>
          {panel}
        </div>
        <ActionResult
          ref={actionResultRef}
          result={actionResult}
          onClose={clearActionResult}
          maxHeight={maxHeight}
          placeholderRef={contentRef}
        />
      </ActionPanelContext.Provider>
    </div>
  )
})

ActionPanel.displayName = "ActionPanel"
