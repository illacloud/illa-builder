import { FC, useCallback, useMemo, useRef, useState } from "react"
import {
  actionContentStyle,
  actionPanelStyle,
} from "@/page/App/components/Actions/ActionPanel/style"
import { useSelector } from "react-redux"
import { getCachedAction } from "@/redux/config/configSelector"
import { ActionTitleBar } from "@/page/App/components/Actions/ActionPanel/ActionTitleBar"
import { MysqlLikePanel } from "./MysqlLikePanel"
import { RestApiPanel } from "@/page/App/components/Actions/ActionPanel/RestApiPanel"
import { TransformerPanel } from "@/page/App/components/Actions/ActionPanel/TransformerPanel"
import { ActionResult } from "@/page/App/components/Actions/ActionPanel/ActionResult"
import { ActionResultType } from "@/page/App/components/Actions/ActionPanel/ActionResult/interface"
import { RedisPanel } from "@/page/App/components/Actions/ActionPanel/RedisPanel"
import { MongoDbPanel } from "@/page/App/components/Actions/ActionPanel/MongoDbPanel"
import { ActionPanelContainerProps } from "@/page/App/components/Actions/ActionPanel/interface"
import { ActionPanelContext } from "@/page/App/components/Actions/ActionPanel/actionPanelContext"
import { ElasticSearchPanel } from "@/page/App/components/Actions/ActionPanel/ElasticSearchPanel"
import { S3Panel } from "@/page/App/components/Actions/ActionPanel/S3Panel"
import { SMTPPanel } from "@/page/App/components/Actions/ActionPanel/SMTPPanel"

export const ActionPanel: FC<ActionPanelContainerProps> = (props) => {
  const { maxHeight } = props
  const panelRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const cachedAction = useSelector(getCachedAction)
  const [actionResult, setActionResult] = useState<ActionResultType>()

  const run = useCallback((result, error) => {
    setActionResult({ result, error })
  }, [])

  const panel = useMemo(() => {
    switch (cachedAction?.actionType) {
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
      default:
        return <></>
    }
  }, [cachedAction])

  const clearActionResult = () => {
    setActionResult(undefined)
    if (contentRef.current) {
      contentRef.current.style.paddingBottom = "48px"
    }
  }

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
          result={actionResult}
          onClose={clearActionResult}
          maxHeight={maxHeight}
          placeholderRef={contentRef}
        />
      </ActionPanelContext.Provider>
    </div>
  )
}

ActionPanel.displayName = "ActionPanel"
