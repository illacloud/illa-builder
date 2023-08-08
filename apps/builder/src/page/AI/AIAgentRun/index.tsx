import { FC } from "react"
import { LayoutAutoChange } from "@/illa-public-component/LayoutAutoChange"
import AIAgentRunMobile from "@/page/AI/AIAgentRun/AIAgentRunMobile"
import AIAgentRunPC from "@/page/AI/AIAgentRun/AIAgentRunPC"

export const AIAgentRun: FC = () => {
  return (
    <LayoutAutoChange
      desktopPage={<AIAgentRunPC />}
      mobilePage={<AIAgentRunMobile />}
    />
  )
}

AIAgentRun.displayName = "AIAgentRun"
export default AIAgentRun
