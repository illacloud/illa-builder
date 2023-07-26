import { FC, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"
import { Input, RadioGroup } from "@illa-design/react"
import { TeamAgentCard } from "@/page/Dashboard/DashboardAiAgent/TeamAgentCard"
import {
  contentContainerStyle,
  listContainerStyle,
  listFilterContainerStyle,
} from "@/page/Dashboard/DashboardAiAgent/style"

interface User {
  userID: string
  nickname: string
  avatar: string
  email: string
  editedAt: string
}

interface Config {
  icon: string
  description: string
}

export interface TeamAiAgent {
  aiAgentID: string
  name: string
  model: number
  type: number
  publish_to_marketplace: boolean
  config: Config
  createdAt: string
  createdBy: string
  editedBy: User[]
}

interface ListData {
  aiAgentList: TeamAiAgent[]
  totalPages: number
}

const listData: ListData = {
  aiAgentList: [
    {
      aiAgentID: "ILAex4p1C7U2",
      name: "Test AI Agent",
      model: 1, // LLM model ID: 1, gpt-3.5-turbo. 2, gpt-3.5-turbo-16k. 3, gpt-4, for more info please see: [AI Agent Model List](#ai-agent-model-list)
      type: 1, // 1, chat. 2, text-generate.
      publish_to_marketplace: true,
      config: {
        icon: "https://images.unsplash.com/photo-1690139217228-df437e22cf21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80",
        description:
          "The purpose of the prompt is to instruct the person to create an algorithm or a set of step-by-step instructions for solving a specific problem related to the {{text}} provided. The prompt is asking for a logical sequence of operations that, when followed correctly, will lead to the desired outcome or solution. The intention is to encourage the individual to think critically and systematically in order to devise an efficient and effective algorithm for the given task.",
      },
      createdAt: "2023-04-13T11:53:13.830921Z",
      createdBy: "ILAfx4p1C7dT",
      editedBy: [
        {
          userID: "1",
          nickname: "your_nickname",
          avatar: "https://cdn.illasoft.com/userID/avatar.png",
          email: "youremail@domain.com",
          editedAt: "2023-03-03 15:54:17.486328",
        },
      ],
    },
    {
      aiAgentID: "ILAex4p1C7U2",
      name: "Test AI Agent",
      model: 1, // LLM model ID: 1, gpt-3.5-turbo. 2, gpt-3.5-turbo-16k. 3, gpt-4, for more info please see: [AI Agent Model List](#ai-agent-model-list)
      type: 1, // 1, chat. 2, text-generate.
      publish_to_marketplace: false,
      config: {
        icon: "https://images.unsplash.com/photo-1690139217228-df437e22cf21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80",
        description:
          "The purpose of the prompt is to instruct the person to create an algorithm or a set of step-by-step instructions for solving a specific problem related to the {{text}} provided. The prompt is asking for a logical sequence of operations that, when followed correctly, will lead to the desired outcome or solution. The intention is to encourage the individual to think critically and systematically in order to devise an efficient and effective algorithm for the given task.",
      },
      createdAt: "2023-04-13T11:53:13.830921Z",
      createdBy: "ILAfx4p1C7dT",
      editedBy: [
        {
          userID: "1",
          nickname: "your_nickname",
          avatar: "https://cdn.illasoft.com/userID/avatar.png",
          email: "youremail@domain.com",
          editedAt: "2023-03-03 15:54:17.486328",
        },
      ],
    },
  ],
  totalPages: 12,
}

export interface AgentContentBodyProps {
  canEdit: boolean
}

export const AgentContentBody: FC<AgentContentBodyProps> = (props) => {
  const { t } = useTranslation()
  const { canEdit } = props
  const [searchParams, setSearchParams] = useSearchParams()

  const [agentType, setAgentType] = useState(searchParams.get("list") || "team")
  const [list, setList] = useState(listData.aiAgentList)
  const agentOptions = useMemo(() => {
    return [
      {
        label: t("Team AI Agent"),
        value: "team",
      },
      {
        label: t("Agent market"),
        value: "market",
      },
    ]
  }, [t])

  const handleAgentTypeChange = (newType: string) => {
    setAgentType(newType)
    setSearchParams({ list: newType })
  }

  return (
    <div css={contentContainerStyle}>
      <Input colorScheme="techPurple" />
      <div css={listFilterContainerStyle}>
        <RadioGroup
          type="button"
          w="287px"
          options={agentOptions}
          value={agentType}
          forceEqualWidth={true}
          colorScheme="grayBlue"
          onChange={handleAgentTypeChange}
        />
      </div>
      <div css={listContainerStyle}>
        {list.map((item) => {
          return (
            <TeamAgentCard
              key={item.aiAgentID}
              agentInfo={item}
              canEdit={canEdit}
            />
          )
        })}
      </div>
    </div>
  )
}
