import { Agent } from "@illa-public/market-agent/MarketAgentCard/interface"
import { FC } from "react"
import { Await, redirect, useLoaderData } from "react-router-dom"
import { AIAgent } from "@/page/AI/AIAgent/aiagent"

export const AIAgentDefer: FC = () => {
  const data = useLoaderData() as {
    data: Promise<Agent>
  }

  return (
    <Await resolve={data.data} errorElement={<>{redirect("404")}</>}>
      <AIAgent />
    </Await>
  )
}

AIAgentDefer.displayName = "AIAgentRun"
export default AIAgentDefer
