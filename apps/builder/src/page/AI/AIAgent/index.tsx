import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@illa-public/mixpanel-utils"
import { Agent } from "@illa-public/public-types"
import { FC, useEffect } from "react"
import {
  Await,
  redirect,
  useBeforeUnload,
  useLoaderData,
} from "react-router-dom"
import { AIAgent } from "@/page/AI/AIAgent/aiagent"
import {
  track,
  trackPageDurationEnd,
  trackPageDurationStart,
} from "@/utils/mixpanelHelper"

export const AIAgentDefer: FC = () => {
  const data = useLoaderData() as {
    data: Promise<Agent>
  }

  useEffect(() => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.VISIT,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT,
    )
    trackPageDurationStart()
    return () => {
      trackPageDurationEnd(ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT)
    }
  }, [])

  useBeforeUnload(() => {
    trackPageDurationEnd(ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_EDIT)
  })

  return (
    <Await resolve={data.data} errorElement={<>{redirect("404")}</>}>
      <AIAgent />
    </Await>
  )
}

AIAgentDefer.displayName = "AIAgentRun"
export default AIAgentDefer
