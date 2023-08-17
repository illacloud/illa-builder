import { FC } from "react"
import { Await, redirect, useLoaderData } from "react-router-dom"
import { LayoutAutoChange } from "@/illa-public-component/LayoutAutoChange"
import AIAgentRunMobile from "@/page/AI/AIAgentRun/AIAgentRunMobile"
import AIAgentRunPC from "@/page/AI/AIAgentRun/AIAgentRunPC"
import { Agent, MarketplaceInfo } from "@/redux/aiAgent/aiAgentState"

export const AIAgentRun: FC = () => {
  const data = useLoaderData() as {
    data: Promise<{
      agent: Agent
      marketplaceInfo: MarketplaceInfo
    }>
  }

  return (
    <Await resolve={data.data} errorElement={<>{redirect("404")}</>}>
      <LayoutAutoChange
        desktopPage={<AIAgentRunPC />}
        mobilePage={<AIAgentRunMobile />}
      />
    </Await>
  )
}

AIAgentRun.displayName = "AIAgentRun"
export default AIAgentRun
