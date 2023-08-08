import { FC, useCallback, useState } from "react"
import { FixedSizeList, ListChildComponentProps } from "react-window"
import InfiniteLoader from "react-window-infinite-loader"
import { Agent, MarketAiAgent } from "@/redux/aiAgent/aiAgentState"
import {
  MARKET_AGENT_SORTED_OPTIONS,
  fetchMarketAgentList,
  forkAIAgentToTeam,
} from "@/services/agent"
import {
  AGENT_LIST_HEIGHT,
  MARKET_AGENT_ITEM_HEIGHT,
  MARKET_PAGE_SIZE,
} from "../../constants"
import { MarketListItem } from "../MarketListItem"
import { MarketAgentListProps } from "./interface"

export const MarketAgentList: FC<MarketAgentListProps> = (props) => {
  const {
    onSelect,
    search,
    sortBy = MARKET_AGENT_SORTED_OPTIONS.POPULAR,
  } = props
  const [marketList, setMarketList] = useState<MarketAiAgent[]>([])

  const [currentPage, setCurrentPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [isNextPageLoading, setIsNextPageLoading] = useState(false)

  const handleClickFork = useCallback(
    async (agent: Agent) => {
      const response = await forkAIAgentToTeam(agent.aiAgentID)
      if (response.data.aiAgentID) {
        onSelect(response.data)
      }
    },
    [onSelect],
  )

  const loadMoreItems = useCallback(async () => {
    setIsNextPageLoading(true)
    const result = await fetchMarketAgentList(currentPage, sortBy, search)
    setCurrentPage((prev) => prev + 1)
    setIsNextPageLoading(false)
    setHasNextPage(result.data.total === MARKET_PAGE_SIZE)
    setMarketList((prev) => prev.concat(result.data.products))
  }, [currentPage, search, sortBy])

  const itemCount = hasNextPage ? marketList.length + 1 : marketList.length
  console.log("hasNextPage", hasNextPage)

  return (
    <InfiniteLoader
      itemCount={itemCount}
      loadMoreItems={isNextPageLoading ? () => {} : loadMoreItems}
      isItemLoaded={(index) => !hasNextPage || index < marketList.length}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          height={AGENT_LIST_HEIGHT}
          width="100%"
          itemCount={itemCount}
          itemData={marketList}
          itemSize={MARKET_AGENT_ITEM_HEIGHT}
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {(props: ListChildComponentProps<MarketAiAgent[]>) => {
            const { index, style, data } = props
            if (
              !Array.isArray(data) ||
              data.length === 0 ||
              index >= data.length
            )
              return null
            const item = data[index]
            if (!item || !item.aiAgent || !item.marketplace) return null
            return (
              <MarketListItem
                item={data[index]}
                onSelected={handleClickFork}
                style={style}
              />
            )
          }}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  )
}
