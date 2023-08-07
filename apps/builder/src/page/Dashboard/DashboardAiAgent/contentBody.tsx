import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import AutoSizer, { Size } from "react-virtualized-auto-sizer"
import { FixedSizeGrid } from "react-window"
import { Input, RadioGroup } from "@illa-design/react"
import { MarketAgentCard } from "@/illa-public-market-component/MarketAgentCard"
import {
  agent_card_width,
  market_agent_card_height,
} from "@/illa-public-market-component/MarketAgentCard/style"
import { TeamAgentCard } from "@/page/Dashboard/DashboardAiAgent/TeamAgentCard"
import { team_agent_card_height } from "@/page/Dashboard/DashboardAiAgent/TeamAgentCard/style"
import {
  applyShowStyle,
  contentContainerStyle,
  listContainerStyle,
  listFilterContainerStyle,
} from "@/page/Dashboard/DashboardAiAgent/style"
import { Agent, MarketAiAgent } from "@/redux/aiAgent/aiAgentState"
import {
  MarketAgentListData,
  SortOptions,
  fetchTeamAgentList,
} from "@/services/agent"

const marketListData: MarketAgentListData = {
  products: [],
  total: 0,
  pageSize: 20,
  pageIndex: 1,
}

export interface AgentContentBodyProps {
  canEdit: boolean
}

export const CARD_GUTTER_SIZE = 24

const init = Array.from({ length: 10 }, (_, index) => ({
  aiAgent: {
    aiAgentID: `ILAex4p1C7U2-${index}`,
    teamID: "ILAex4p1C7U2",
    name: "Test AI Agent",
    model: 1,
    agentType: 1,
    publishedToMarketplace: true,
    icon: "https://images.unsplash.com/photo-1690139217228-df437e22cf21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80",
    description:
      "The purpose of the prompt is to instruct the person to create an algorithm or a set of step-by-step instructions for solving a specific problem related to the {{text}} provided. The prompt is asking for a logical sequence of operations that, when followed correctly, will lead to the desired outcome or solution. The intention is to encourage the individual to think critically and systematically in order to devise an efficient and effective algorithm for the given task.",
    createdBy: "ILAfx4p1C7dT",
    createdAt: "2023-04-13T11:53:13.830921Z",
    updatedBy: "ILAfx4p1C7dT",
    updatedAt: "2023-04-13T11:53:13.830921Z",
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
  marketplace: {
    marketplaceID: "ILAex4p1C7U2",
    numStars: 200,
    numForks: 200,
    numRuns: 200,
    contributorTeam: {
      teamID: "ILAex4p1C7U2",
      icon: "https://images.unsplash.com/photo-1690139217228-df437e22cf21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80",
      name: "Test AI Agent",
    },
    createdBy: "ILAfx4p1C7dT",
    createdAt: "2023-04-13T11:53:13.830921Z",
    updatedBy: "ILAfx4p1C7dT",
    updatedAt: "2023-04-13T11:53:13.830921Z",
  },
}))
const getVirtulSize = (width: number, card_height: number, dataLen: number) => {
  // 计算每行能容纳的卡片数量
  const cardCountPerRow = Math.floor(
    (width + CARD_GUTTER_SIZE) / (agent_card_width + CARD_GUTTER_SIZE),
  )
  // 计算实际每个卡片的宽度（考虑了间距）
  const cardWidth =
    (width - (cardCountPerRow - 1) * CARD_GUTTER_SIZE) / cardCountPerRow
  const cardHeight = card_height + CARD_GUTTER_SIZE
  const columnCount = Math.floor(width / cardWidth)
  const rowCount = Math.ceil(dataLen / columnCount)

  return {
    cardWidth,
    cardHeight,
    columnCount,
    rowCount,
  }
}
export const AgentContentBody: FC<AgentContentBodyProps> = (props) => {
  const { t } = useTranslation()
  const { canEdit } = props
  const { teamIdentifier } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [agentType, setAgentType] = useState(searchParams.get("list") || "team")
  const [list, setList] = useState<Agent[]>([])
  const [marketList, setMarketList] = useState<MarketAiAgent[]>([])
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

  const toRunAgent = useCallback(
    (aiAgentID: string) => {
      navigate(`/${teamIdentifier}/ai-agent/${aiAgentID}/run`)
    },
    [navigate, teamIdentifier],
  )

  const getAgentList = () => {
    fetchTeamAgentList(SortOptions.ID).then((res) => {
      console.log(res)
      setList(res.data.aiAgentList)
    })

    setMarketList(marketListData.products)
    // setMarketList(init)
  }

  const handleAgentTypeChange = (newType: string) => {
    setAgentType(newType)
    setSearchParams({ list: newType })
  }

  useEffect(() => {
    getAgentList()
  }, [])

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
        <AutoSizer css={applyShowStyle(agentType === "market")}>
          {({ width, height }: Size) => {
            const { cardWidth, cardHeight, columnCount, rowCount } =
              getVirtulSize(width, market_agent_card_height, marketList.length)
            console.log(
              "cardWidth",
              cardWidth,
              "cardHeight",
              cardHeight,
              "columnCount",
              columnCount,
              "rowCount",
              rowCount,
              "marketList",
              marketList.length,
              init,
            )
            return (
              <FixedSizeGrid
                height={height}
                width={width}
                columnCount={columnCount}
                rowCount={rowCount}
                columnWidth={cardWidth}
                rowHeight={cardHeight}
                itemData={marketList}
              >
                {({ columnIndex, rowIndex, style }) => {
                  const itemIndex = rowIndex * columnCount + columnIndex
                  const item = marketList[itemIndex]
                  if (!item) {
                    return null
                  }
                  return (
                    <MarketAgentCard
                      key={item.aiAgent.aiAgentID}
                      style={style}
                      agentInfo={item}
                      onClick={toRunAgent}
                    />
                  )
                }}
              </FixedSizeGrid>
            )
          }}
        </AutoSizer>
        <AutoSizer css={applyShowStyle(agentType === "team")}>
          {({ width, height }: Size) => {
            const { cardWidth, cardHeight, columnCount, rowCount } =
              getVirtulSize(width, team_agent_card_height, list.length)
            return (
              <FixedSizeGrid
                height={height}
                width={width}
                columnCount={columnCount}
                rowCount={rowCount}
                columnWidth={cardWidth}
                rowHeight={cardHeight}
                itemData={list}
              >
                {({ columnIndex, rowIndex, style }) => {
                  const itemIndex = rowIndex * columnCount + columnIndex
                  const item = list[itemIndex]
                  if (!item) {
                    return null
                  }
                  return (
                    <TeamAgentCard
                      key={item.aiAgentID}
                      style={style}
                      agentInfo={item}
                      canEdit={canEdit}
                      onClick={toRunAgent}
                    />
                  )
                }}
              </FixedSizeGrid>
            )
          }}
        </AutoSizer>
      </div>
    </div>
  )
}
