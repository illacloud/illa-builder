import { FC } from "react"
import { Await, redirect, useLoaderData } from "react-router-dom"
import { AIAgent } from "@/page/AI/AIAgent/aiagent"
import { Agent } from "@/redux/aiAgent/aiAgentState"

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
