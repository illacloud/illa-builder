import { FC, useCallback, useEffect, useRef, useState } from "react"
import { FixedSizeList, ListChildComponentProps } from "react-window"
import InfiniteLoader from "react-window-infinite-loader"
import { MarketAiAgent } from "@/redux/aiAgent/aiAgentState"
import {
  MARKET_AGENT_SORTED_OPTIONS,
  fetchMarketAgentList,
} from "@/services/agent"
import { AGENT_LIST_HEIGHT, MARKET_AGENT_ITEM_HEIGHT } from "../../constants"
import { MarketListItem } from "../MarketListItem"
import { MarketAgentListProps } from "./interface"

export const MarketAgentList: FC<MarketAgentListProps> = (props) => {
  const { onSelect, search } = props
  const [teamList, setTeamList] = useState<MarketAiAgent[]>([])

  const currentPageRef = useRef(1)
  const hasNextPageRef = useRef<boolean>(false)

  const loadMoreItems = useCallback(async () => {
    const result = await fetchMarketAgentList(
      ++currentPageRef.current,
      MARKET_AGENT_SORTED_OPTIONS.POPULAR,
      search,
    )
    hasNextPageRef.current = result.data.pageSize > currentPageRef.current
    setTeamList((prev) => prev.concat(result.data.products))
  }, [search])

  useEffect(() => {
    const abortController = new AbortController()
    const fetchData = async () => {
      const result = await fetchMarketAgentList(
        1,
        MARKET_AGENT_SORTED_OPTIONS.POPULAR,
        search,
        abortController.signal,
      )
      hasNextPageRef.current = result.data.pageSize > currentPageRef.current
      setTeamList(result.data.products)
    }
    fetchData()
    return () => {
      abortController.abort()
    }
  }, [search])

  return (
    <InfiniteLoader
      itemCount={teamList.length}
      loadMoreItems={loadMoreItems}
      isItemLoaded={(index) =>
        !hasNextPageRef.current || index < teamList.length
      }
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          height={AGENT_LIST_HEIGHT}
          width="100%"
          itemCount={teamList.length}
          itemData={teamList}
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
            return (
              <MarketListItem
                item={data[index]}
                onSelected={onSelect}
                style={style}
              />
            )
          }}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  )
}
